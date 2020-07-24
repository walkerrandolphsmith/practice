# Persistent Storage

So far we have scaled our service to meet usage demands, but each instance of our service kept track of its own version of the known users and worse if the service crashed or was shut down all the information about users was stored in memory and will not exist when the service is restarted.

We can leverage a persistent storage solution to ensure that the data lives longer than the lifetime of any instance of the service and that the data is synchronized across instances.

In this lesson, we'll use MongoDB as a non-relational database. More on types of persistent storage later.

We'll need to replace any references to `usersById` with an interface with our persistent storage. Let's first leverage a package to interface with a MongoDB database.

```
npm i --save mongoose
```

We will create a representation of a user and its schema using mongoose. At the moment this will allow users to define the various properties of a User.

```
const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    username: {
        type: String,
        unique: true,
    }
}))
```

Now we'll tackle each endpoint one by one replacing the logic involving `usersById` with calls to mongoose to retrieve, create, and delete users.

```
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.model');

const app = express();
app.use(bodyParser.json());

app.get('/user', (request, response) => {
    const username = request.query.username;
    if (username) {
        return User
            .findOne({ username: username })
            .then(user => {
                if (!user) return response.status(404).send({ reason: "A user with the specified ID was not found" });
                return response.status(200).send({ id: user._id, username: user.username });
            })
            .catch((error) => console.log(error))
    }
    return User.find({}).then(users => {
        const usersById = users.reduce((acc, next) => {
            return Object.assign(acc, { [next._id]: { id: next._id, username: next.username } })
        }, {})
        response.status(200).send(usersById)
    })
});

app.post('/user', (request, response) => {
    const requestBody = request.body;
    const username = requestBody.username;
    if (!requestBody || !username || typeof username !== 'string')
        return response.status(400).send({ reason: 'Username must be a non-empty string' })

    User.create({ username: username })
        .then((user) => {
            return response.status(201).send({ id: user._id, username: user.username });
        })
        .catch((error) => {
            return response.status(409).send({ reason: 'User already exists' });
        })
})

app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    return User
        .findById(id)
        .then(user => {
            if (!user) return response.status(404).send({ reason: "A user with the specified ID was not found" })
            return response.status(200).send({ id: user._id, username: user.username });
        })
        .catch(() => response.status(404).send({ reason: "A user with the specified ID was not found" }))
});

app.delete('/user/:id', (request, response) => {
    const id = request.params.id;
    return User.deleteOne({ id: id }).then(transactionRecord => {
        if (transactionRecord.ok === 1 && transactionRecord.deletedCount > 0) return response.status(200).send()
        return response.status(404).send({ reason: "A user with the specified ID was not found" })
    })
    .catch((error) => console.log(error))
})

module.exports=app;
```

We'll also need to connect to the mongo database before we handle in traffic to our endpoints. If the connection fails we catch the error but any endpoints that rely on that connection won't work... More on resilient services later.

```
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch(error => console.log('Error connecting to mongo', error));
```

Let's add a container running MongoDB to our docker-compose file

```
networks:
  webnet:
  intranet:

volumes:
  data-db:

api:
    environment:
      - MONGO_URI=mongodb://db:27017/dev-db
    networks:
      - webnet
      - intranet

db:
    image: mongo:3.6-jessie
    container_name: my-db-container
    networks:
      - intranet
    volumes:
      - data-db:/data/db
```

- Let's add a new network that is not publicly exposed between the service and the database
- Inject the database connection string as an environment variable to ensure our service is more portable
- Mount a volume on the host machine to ensure data is persisted after the mongo container stops

```
docker-compose up --scale api=5
curl https://localhost/user -k
```

Now try interacting with our service and note the data is in sync and persists after container stop and starts.

What about unit tests and integration tests? Better yet what about the Single Responsibility Principle?
Currently, just one endpoint is responsible for

- Defining the endpoint and HTTP verb
- Parsing parameters and the request body
- Collaborating with mongo interface
- Reshaping the user data
- Handling HTTP response codes
- Handling error messages

Try refactoring this file and extract out responsibilities. To remain confident that things continue to work after you change the code you'll want some integration tests first.

# HTTP Server

We're going to create a lightweight HTTP server written in Node.js

## Setup

First let's initialize our project

```
npm i --yes
```

Next let's use the express framework to help to do some of the heavy lifting

```
npm --save express
```

Now let's create a `src` directory to house our code and create a new file.

```
mkdir src
touch src/index.js
```

## Create an HTTP server

We can use express to create an HTTP server at the domain localhost and a specified port

```
const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('Now accepting requests at http://localhost:3000');
});
```

## GET Endpoints

This isn't useful at the moment so let's add some endpoints

```
app.get('/', (request, response) => response.status(200).send('Hello World'));
app.get('/ping', (request, response) => response.status(200).send({ "message": "pong" }));
```

Now our service can accept HTTP GET requests to `~/` and `~/ping`. Let's test this theory

```
curl -v http://localhost:3000/
```

## POST Endpoints

Let's provide our service with data

```
app.post('/add', (request, response) => {
    const body = request.body;
    const sum = body.x + body.y;
    return response.status(200).send({ "result": sum });
});
```

We can make an HTTP POST request to supply the service with data

```
curl http://localhost:3000/add --request POST --data '{ "x": 1, "y": 2 }'
```

The issue is our express app doesn't yet know how to handle the intricate details of parsing the HTTP request body. Let's leverage a package that can help.

```
npm i --save body-parser
```

We can add this middleware to parse the HTTP request body for all requests. More on middlewares latter.

```
app.use(require('body-parser').json());
```

Since we parsed the HTTP request body as JSON we'll need to set the Content-Type HTTP header to application/json to let the server known what the MIME type of the incoming data is...

```
curl http://localhost:3000/add -H "Content-Type: application/json" --request POST --data '{ "x": 1, "y": 2 }'
```

## 404 Not Found

Let's recreate the classic 404

```
curl http://localhost:3000/unknown -v
```

Notice the status code with verbose logging is 404. That is because our server was reachable, but the endpoint being requested was not found

## 500 Error

Let's recreate a class 500 error
First, we'll create an endpoint for process division

```
app.post('/divide', (request, response) => {
    const body = request.body;
    const numerator = body.numerator;
    const denominator = body.denominator;
    if (denominator === 0) return response.status(500).send({ "reason": "ERR1" });
    return response.status(200).send({ "result": numerator/denominator });
});
```

If the consumer attempts to divide by zero we'll respond with an HTTP status code of 500 indicating an error occurred, otherwise we'll respond with an HTTP status code of 200 and the result upon division.

```
curl http://localhost:3000/add -H "Content-Type: application/json" --request POST --data '{ "numerator": 1, "denominator": 0 }'
```

## Integration Tests

Want to put those unit testing skills to test? We could extract the implementation details of endpoint handlers into functions and unit test them.
We can go a step further and run some "integration tests" to ensure that when the server is running it responds to the endpoints correctly. Integration tests make assertions about the behavior of a sub-system of code instead of an atomic unit of code.

Similar to the unit tests exercise we can use a package to facilitate writing our tests.

```
npm i --save-dev mocha supertest
```

We'll create a test suite in index.test.js. Notice I don't name it `.spec.js` because that is reserved for unit tests.

```
touch index.test.js
```

Let's describe the scenario of making an HTTP GET request to `~/` the responds with "hello world"

```
const request = require('supertest');
const app = require('./server');

describe('HTTP GET /', () => {
    it ('should respond with hello world', done => {
        request(app).get('/')
        .expect(200, "Hello World")
        .end(done);
    });
});
```

Since there is network latency in making the HTTP request we will inject a function named `done` to tell the test suite when the response has been received and evaluated. Also, we'll have to make our app a public member in order to reference it

```
module.exports = app;
```

Now we can run our test suite and see a passing test .... but the terminal also doesn't receive an exit code. That will be a problem later so let's figure out how to fix it...

In our index.js file, we invoke `listen` function which makes the process continue indefinitely which ultimately is what keeps the terminal from receiving that exit code. Let's extract out everything about our app except the invocation to listen.

```
touch server.js
mv index.test.js server.test.js
```

Update index.js

```
const app = require('./server');

app.listen(3000, function() {
    console.log('Now accepting requests at http://localhost:3000');
});
```

Update server.js

```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.status(200).send('Hello World'));
app.get('/ping', (request, response) => response.status(200).send({ "message": "pong" }));

app.post('/add', (request, response) => {
    const body = request.body;
    const sum = body.x + body.y;
    return response.status(200).send({ "result": sum });
});

app.post('/divide', (request, response) => {
    const body = request.body;
    const numerator = body.numerator;
    const denominator = body.denominator;
    if (denominator === 0) return response.status(500).send({ "reason": "ERR1" });
    return response.status(200).send({ "result": numerator/denominator });
});

module.exports=app;
```

Now run the test suite and see it pass the test and send the terminal the exit code telling it the process is complete

Let's write one more test for the add endpoint.

```
describe('HTTP POST /add', () => {
    it('should return the sum', done => {
        request(app)
            .post('/add')
            .send({ x: 1, y: 1 })
            .expect(200, { "result": 2 })
            .end(done)
    })
})
```

## 400 Bad request

Let's circle back to our add endpoint. What the consumer doesn't supply `x` and `y`? When certain requirements are not met we can respond with an HTTP status code of 400 to inform the consumer their request did not satisfy certain requirements

```
if (body.x === undefined) return response.status(400).send({ "reason": "x is required in the request body" });
if (body.y === undefined) return response.status(400).send({ "reason": "y is required in the request body" });
```

So when is it a 400 and when is it a 500?
The main difference between the two is whose fault that error is. A 4xx code indicates an error caused by the user, whereas 5xx codes tell the client that they did everything correctly and it's the server itself who caused the problem

## Route Parameters

Let's say you want to request information from your service and you want a specific entity. You want information about a specific user and not any other user. One way we can handle this is by using a named a portion of the URL that has a variable value that is captured in the request parameters.

```
curl http://localhost:3000/user/3002
```

Let's drive this implementation with a test. We'll create a scenario where we make a request to user 3002 and assert that it was the correct username and id.

```
describe('HTTP GET /user/:id', () => {
    it('should return information specific to user with the id of :id', done => {
        request(app)
            .get('/user/3002')
            .expect(200, { "result": { id: 3002, username: "kyle" } })
            .end(done)
    })
})
```

Now let's implement this endpoint handler. We'll fake out a database of users since it’s outside the scope of this lesson.

```
const usersById = {
    3002: { id: 3002, username: "kyle" }
}

app.get('/user/:id', (request, response) => {
    const params = request.params;
    const userId = params.id;
    const user = usersById[userId];
    return response.status(200).send({ "result": user });
})
```

When we ask ourselves what test scenarios to write we leverage the notion of equalivancy classes. Writing another scenario for differnt, known user just repeats the assertion we have already made, i.e. a user in the database can be retrieved by ID. What might be more useful is handling a different class of problem, say an error is thrown when a user not in the datbase is requested for by ID. Let's write that scenario:

```
describe('HTTP GET /user/:id', () => {
    describe('Given a user is in the database', () => {
        it('should return information specific to user with the id of :id', done => {
            request(app)
                .get('/user/3002')
                .expect(200, { "result": { id: 3002, username: "kyle" } })
                .end(done)
        })
    })
    describe('Given the user is not in the database', done => {
        it('should return an error', done => {
            request(app)
                .get('/user/100000')
                .expect(500, { "reason": "ERR1" })
                .end(done)
        })
    })
})
```

And to get passing tests.

```
 if (!user) return response.status(500).send({ "reason": "ERR1" })
```

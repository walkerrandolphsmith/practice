# Feature Toggles

Feature toggles, also known as feature flags, allow the runtime behavior of service to altered via configuration with zero downtime to the service, meaning it does not require recompiling, generating new artifacts, or redeploying a service.

Feature toggles enable you to rapidly introduce new capabilities or optimizations to existing capabilities while reducing risk. If anything goes wrong or the customer hates the experiment, you can change the configuration and instantly revert your system to previous behavior.

In its simplest form feature flags are named booleans that are persistently stored, either in a configuration file, database, or perhaps an application that provides them as a service.

## Experiment

Let's create a very simple HTTP server that returns a small webpage.

```
mkdir src
touch src/index.js
npm init --yes
npm i --save express
```

Our express app will respond to the `~/` endpoint with HTML content.

```
const express = require('express');
const app = express();
app.get('/', (request, response) => {
    response.status(200).send(`<html><head></head><body><p>Cool website.</p></body></html>`);
})
app.listen(3000, () => console.log('Listening on port 3000'));
```

Dockerfile specifies how to build an image based on nodejs that includes our source code, installs dependencies, and runs the app when the container is started.

```
FROM node:10-alpine
WORKDIR /usr/src/my-service
COPY package-lock.json package.json ./
COPY src ./src
RUN npm install --no-progress --ignore-optional --silent
CMD ["npm", "run", "start"]
```

Docker-compose file will specify our service, how to build the image it’s based on, and expose ports.

```
version: "3.4"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

Next, let's add a configuration file

```
touch flags.json
echo >> { "isThemingEnabled": false }
```

In order for this to be a feature toggle and not use a boolean in our codebase, we must separate it from our code. Our Dockerfile should not COPY it to the image. If it did we would have to rebuild the image any time changes were made to the file. Instead, we will mount the file as a volume. An external source, in this case, our host machine, will be responsible for this file. When it changes the volume attached to the container will automatically be updated.

```
volumes:
  - ./flags.json:/data/flags.json
```

Now in our app, we'll need to read the file from the mounted volume at `/data/flags.json`.

```
fs.readFile('/data/flags.json', function(error, contents) {
    if (error) return response.status(500).send({ reason: "Couldn't read feature flag configuration" })
    return response.status(200).send(`<html><head></head><body><p>Cool website.</p></body></html>`);
})
```

Now we have the flexibility of changing the value of the flag without rebuilding. Our service can include forks in code paths based on these flags. We can safely introduce the capability of "theming" and if customers hate it, it breaks some other capability, or for any other reason we can instantly turn it off.

```
try {
    const flags = JSON.parse(contents);
    console.log(flags);
    const theme = flags.isThemingEnabled ? ' style="background: red"' : '';
    return response.status(200).send(`<html><head></head><body${theme}><p>Cool website.</p></body></html>`);
} catch {
    return response.status(500).send({ reason: "configuration is not proper JSON" })
}
```

Check out the result by requesting localhost:3000 in your browser. Change the value of the flag and then reload the browser.

## User Segmentation

Feature flags can be turned on and off in a way that impacts every user’s experience or targeted to a subset of users. Classifying and grouping users is called user segmentation. Adjusting the runtime behavior of the system for a subset of users is a great way to A/B test, roll out beta features slowly, or expose capabilities that are uniquely tailored to a specific demographic. More on user segmentation, A/B testings, rolling updates later!

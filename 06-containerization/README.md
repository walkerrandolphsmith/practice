# Docker

We have reviewed a few programming practices

- Keeping a record of changes to our code via source control
- Ignoring artifacts from history that can be reproduced from the source code
- Creating services that uphold the contract of exposing their functionality via standard protocols (HTTP)
- Raising our confidence in changing our code with unit tests
- Ensuring end-to-end capabilities are intact

So far we have a node.js service that runs on this machine. A specific version of Node.js running on a specific operating system, running a specific instruction set architecture on a specific set of hardware. All the specifics of the scenario can be described as the environment in which our service is running. Will the service run in a different environment? On your machine? On a production server running a lightweight Linux distro? Here lies the adage "It works on my machine"

Docker can provide us with os-level virtualization to abstract away the details of an environment and guarantee that our service can run in a container.
We can describe the details of our environment with a `Dockerfile` which docker can leverage to generate a blueprint of the environment, called an image. Once the image is generated docker can use this blueprint to generate a running instance of our service in a container. The abstraction of the environment from the service has many benefits including knowing it will work on any machine that runs the Docker daemon.

Let's start by describing an enviornment for our Nodejs service.
We can specify a base image with the `FROM` keyword. To simplify things we're going to use an existing image that has Node.js installed on an alpine Linux distro
Then we'll set the current working directory within the image
We'll copy over our source code
Next, we'll install our dependencies, but remember this won't leverage Nodejs or NPM installed on your host machine, in fact, we can uninstall node to prove it.

```
touch .Dockerfile
```

```
FROM node:10-alpine
WORKDIR /usr/src/my-service
COPY package-lock.json package.json ./
COPY src ./src
RUN npm install --no-progress --ignore-optional --silent
CMD ["npm", "run", "start"]
```

Next, let's build an image from the Dockerfile

```
docker build --tag my-service:1.0 .
```

Let's create a running instance of this container from our image. We'll reroute traffic coming in on the host's port 3009 to our container's port 3000

```
docker run --publish 3009:3000 --detach --name my-service-instance my-service:1.0
```

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserController = require('./user.controller');
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

const connect = () => mongoose.connect(MONGO_URI, {
  replset: { rs_name: "rs0" },
  poolSize: 5,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500
})

connect();

const app = express();
app.use(bodyParser.json());

app.get('/healthcheck', (request, response) => {
  connect().then(connection => {
    return response.status(200).send({
      hosts: connection.connections.map(c => c.host),
      ports: connection.connections.map(c => c.port),
      isConnected: true,
      hostName: process.env.HOSTNAME,
    });
  })
});

app.get('/user', UserController.handleGetAll);
app.post('/user', UserController.handleCreate)
app.get('/user/:id', UserController.handleGetById);
app.delete('/user/:id', UserController.handleDelete)

module.exports=app;
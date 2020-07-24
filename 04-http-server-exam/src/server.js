const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const usersById = {
    1: { username: "kyle" }
}

app.get('/user', (request, response) => {
    return response.status(200).send(usersById);
});

module.exports=app;
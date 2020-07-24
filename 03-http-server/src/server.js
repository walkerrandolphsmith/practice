const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.status(200).send('Hello World'));
app.get('/ping', (request, response) => response.status(200).send({ "message": "pong" }));

app.post('/add', (request, response) => {
    const body = request.body;
    if (body.x === undefined) return response.status(400).send({ "reason": "x is required in the request body" });
    if (body.y === undefined) return response.status(400).send({ "reason": "y is required in the request body" });
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

const usersById = {
    3002: { id: 3002, username: "kyle" }
}

app.get('/user/:id', (request, response) => {
    const params = request.params;
    const userId = params.id;
    const user = usersById[userId];
    if (!user) return response.status(500).send({ "reason": "ERR1" })
    return response.status(200).send({ "result": user });
})

module.exports=app;
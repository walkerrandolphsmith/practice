const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const Math = require("./math");

app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/add", (request, response) => {
  const body = request.body;
  if (body.x === undefined)
    return response
      .status(400)
      .send({ reason: "x is required in the request body" });
  if (body.y === undefined)
    return response
      .status(400)
      .send({ reason: "y is required in the request body" });
  const sum = Math.add(body.x, body.y);
  return response.status(200).send({ result: sum });
});

app.post("/multiply", (request, response) => {
  const body = request.body;
  if (body.x === undefined)
    return response
      .status(400)
      .send({ reason: "x is required in the request body" });
  if (body.y === undefined)
    return response
      .status(400)
      .send({ reason: "y is required in the request body" });
  const product = Math.multiply(body.x, body.y);
  return response.status(200).send({ result: product });
});

app.post("/divide", (request, response) => {
  const body = request.body;
  const numerator = body.numerator;
  const denominator = body.denominator;
  if (denominator === 0)
    return response.status(400).send({ reason: "denominator can not be zero" });
  if (denominator === undefined)
    return response
      .status(400)
      .send({ reason: "numerator is required in the request body" });
  if (numerator === undefined)
    return response
      .status(400)
      .send({ reason: "denominator is required in the request body" });
  return response.status(200).send({ result: numerator / denominator });
});

module.exports = app;

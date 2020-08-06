const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const usersById = {
  1: { username: "kyle" },
};

app.get("/user", (request, response) => {
  const username = request.query.username;
  if (username) {
    const match = Object.entries(usersById).find(
      ([key, value]) => value.username === username
    );
    if (!match)
      return response
        .status(404)
        .send({ reason: "A user with the specified ID was not found" });
    const [id, user] = match;
    return response.status(200).send({ [id]: user });
  }
  return response.status(200).send(usersById);
});

app.post("/user", (request, response) => {
  const requestBody = request.body;
  const username = requestBody.username;
  if (!requestBody || !username || typeof username !== "string")
    return response
      .status(400)
      .send({ reason: "Username must be a non-empty string" });
  const isExistingUser = Object.values(usersById).some(
    (user) => user.username === username
  );
  if (isExistingUser)
    return response.status(409).send({ reason: "User already exists" });
  const nextId =
    Number(
      Object.keys(usersById).reduce(
        (acc, next) => (acc < next ? next : acc),
        -1
      )
    ) + 1;
  usersById[nextId] = { username: username };
  return response.status(201).send({ id: nextId, username: username });
});

app.get("/user/:id", (request, response) => {
  const id = request.params.id;
  const user = usersById[id];
  if (!user)
    return response
      .status(404)
      .send({ reason: "A user with the specified ID was not found" });
  return response.status(200).send(user);
});

app.delete("/user/:id", (request, response) => {
  const id = request.params.id;
  const user = usersById[id];
  if (!user)
    return response
      .status(404)
      .send({ reason: "A user with the specified ID was not found" });
  delete usersById[id];
  return response.status(200).send(user);
});

module.exports = app;

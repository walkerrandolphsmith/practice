const express = require("express");
const cookieSession = require("cookie-session");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.get("/", (_, response) => {
  return response
    .status(200)
    .send({ message: "Hello World", hostname: process.env.HOSTNAME });
});

app.get("/post", (request, response) => {
  const session = request.session;
  if (!session || !session.username)
    return response.status(403).send({
      reason: "You must log in first",
      hostname: process.env.HOSTNAME,
    });
  const postsByUserName = {
    walker: ["My first post", "This is my second posts"],
    kyle: ["I want to learn", "This is what a learned"],
  };
  const posts = postsByUserName[session.username] || ["posts"];
  return response.status(200).send({ posts, hostname: process.env.HOSTNAME });
});

app.get("/login", (request, response) => {
  const username = request.query.username;
  if (!username)
    return response
      .status(400)
      .send({ reason: "Requires a username", hostname: process.env.HOSTNAME });
  if (!request.session) request.session = {};
  request.session.username = username;
  return response.status(200).send({
    message: "Welcome back " + username,
    hostname: process.env.HOSTNAME,
  });
});

app.get("/logout", (request, response) => {
  const session = request.session;
  if (!session || !session.username)
    return response.status(500).send({
      reason: "You must be logged in",
      hostname: process.env.HOSTNAME,
    });
  request.session.username = null;
  return response
    .status(200)
    .send({ message: "Bye", hostname: process.env.HOSTNAME });
});

app.listen(3000, () =>
  console.log(`MyPosts is ready at ${process.env.HOSTNAME}`)
);

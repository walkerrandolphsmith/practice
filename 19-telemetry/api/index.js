const express = require("express");

const app = express();

app.get("/api/fast", (_, response) => {
  response.status(200).send({ message: "Fast... all good " });
});

app.get("/api/slow", (_, response) => {
  setTimeout(() => {
    response
      .status(200)
      .send({ message: "Slow endpoint... maybe we should do something" });
  }, 10000);
});

app.get("/api/error", (_, response) => {
  response.status(500).send({ message: "This endpoint is broken" });
});

app.get("/api/post", (_, response) => {
  response.status(200).send({ posts: [1, 2, 3] });
});

app.get("/api/cpu-intense", (_, response) => {
  let count = 0;
  for (var i = 1; i < 5000000000; i++) {
    count = count / i;
  }
  response.status(200).send({ count });
});

app.get("/api/post/:id", (request, response) => {
  const id = request.params.id;
  response.status(200).send({ post: { id: id, content: "This is a post" } });
});

app.listen(4000, () => console.log(`🚀 Monitored api running on :4000`));

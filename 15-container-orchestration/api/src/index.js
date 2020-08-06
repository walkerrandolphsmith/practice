const express = require("express");
const app = express();

app.get("/healthcheck", (_, response) =>
  response.status(200).send({
    instance: process.env.MY_POD_NAME,
    message: "Hello World",
  })
);

app.listen(3000, () =>
  console.log(`🚀 server ready at http://${process.env.HOST}:3000`)
);

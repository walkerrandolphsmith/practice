const express = require("express");

const app = express();

app.get("/", (_, response) => {
  console.log(`A request was made to HTTP GET ~/`);
  console.log(`request made at: ${new Date().toLocaleTimeString()}`);
  response.status(200).send("Our app writes logs to stdout!");
});

app.get("/error", (_, response) => {
  console.error(`An error was handled for the request to HTTP GET ~/error`);
  console.error(`request made at: ${new Date().toLocaleTimeString()}`);
  response.status(200).send("Our app writes logs to stderr!");
});

app.listen(3000, () =>
  console.log("🚀 Cloud Native app write to Stdout and stderr")
);

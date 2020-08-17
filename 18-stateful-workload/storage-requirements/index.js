const express = require("express");
const fs = require("fs").promises;

const LOG_PATH = process.env.LOG_PATH;
const LOG_FILE = `${LOG_PATH}/${process.env.LOG_FILE}`;

const app = express();

app.get("/", async (_, response) => {
  try {
    const contents = await fs.readFile(LOG_FILE, "utf8");
    return response.status(200).send({ contents });
  } catch (error) {
    return response.status(500).send({ error });
  }
});

app.post("/", async (_, response) => {
  await fs.appendFile(LOG_FILE, `INFO: A request was made to HTTP GET ~/\n`);
  await fs.appendFile(
    LOG_FILE,
    `INFO: request made by ${
      process.env.HOSTNAME
    }, at: ${new Date().toLocaleTimeString()}\n`
  );
  response.status(200).send("Our app writes logs to a file :/");
});

app.post("/error", async (_, response) => {
  await fs.appendFile(LOG_FILE, `ERROR: A request was made to HTTP GET ~/\n`);
  await fs.appendFile(
    LOG_FILE,
    `ERROR: request made at: ${new Date().toLocaleTimeString()}\n`
  );
  response
    .status(200)
    .send("Our app writes logs to a file with a log level ERROR :/");
});

app.listen(3000, async () => {
  await fs.mkdir(LOG_PATH, { recursive: true });
  fs.writeFile(LOG_FILE, `INFO: The app is starting\n`);
});

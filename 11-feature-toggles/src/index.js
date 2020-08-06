const express = require("express");

const fs = require("fs");

const app = express();

app.get("/", (request, response) => {
  fs.readFile("/data/flags.json", function (error, contents) {
    if (error)
      return response
        .status(500)
        .send({ reason: "Couldn't read feature flag configuration" });
    try {
      const flags = JSON.parse(contents);
      console.log(flags);
      const theme = flags.isThemingEnabled ? ' style="background: red"' : "";
      return response
        .status(200)
        .send(
          `<html><head></head><body${theme}><p>Cool website.</p></body></html>`
        );
    } catch {
      return response
        .status(500)
        .send({ reason: "configuration is not proper JSON" });
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));

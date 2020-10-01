const express = require("express");
const promMid = require("express-prometheus-middleware");

const version = "2.0.0";

const app = express();

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    customLabels: ["contentType", "version", "app"],
    transformLabels(labels, req) {
      labels.contentType = req.headers["content-type"];
      labels.version = version;
      labels.app = "api";
    },
  })
);

app.get("/", (_, response) => {
  return response.status(200).send({
    host: process.env.HOSTNAME,
    version,
  });
});

setTimeout(() => {
  const probe = express();
  probe.get("/live", (_, response) => response.status(200).send());

  probe.get("/ready", (_, response) => {
    response.status(200).send();
  });
  probe.listen(3001);
}, 10000);

app.listen(3000);

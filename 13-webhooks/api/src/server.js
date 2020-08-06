const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const amqplib = require("amqplib/callback_api");
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((error) => console.log("Error connecting to mongo", error));

const WEBHOOK_QUEUE = "WebhookQueue";
const validEventTypes = ["LIKED_POST", "COMMENTED_ON_POST"];

const WebhookSubscriptionModel = mongoose.model(
  "WebhookSubscriptionModel",
  mongoose.Schema({
    url: String,
    eventTypes: [String],
  })
);

let channel;
const getChannel = () => {
  return new Promise((resolve, reject) => {
    if (channel) return resolve(channel);
    else
      amqplib.connect(process.env.RABBITMQ_URL, (error, connection) => {
        if (error) reject(error);
        connection.createChannel((channelError, c) => {
          if (channelError) return reject(channelError);
          return resolve(c);
        });
      });
  });
};

const app = express();
app.use(bodyParser.json());

app.get("/subscription", (_, response) => {
  return WebhookSubscriptionModel.find({}).then((subscriptions) =>
    response.status(200).send(subscriptions)
  );
});
app.post("/subscription", (request, response) => {
  const body = request.body;
  const url = body.url;
  const eventTypes = body.eventTypes;

  if (!url || typeof url !== "string")
    return response.status(400).send({ reason: "url must be a string" });
  if (!eventTypes || !Array.isArray(eventTypes))
    return response.status(400).send({ reason: "eventTypes must be an array" });
  if (eventTypes.some((eventType) => typeof eventType !== "string"))
    return response
      .status(400)
      .send({ reason: "eventTypes must be an array of strings" });
  if (eventTypes.some((eventType) => !validEventTypes.includes(eventType)))
    return response.status(400).send({
      reason: `eventTypes must be one of: ${validEventTypes.join(", ")}`,
    });

  return WebhookSubscriptionModel.create({ url, eventTypes }).then((created) =>
    response.status(201).send(created)
  );
});
app.get("/subscription/:id", (request, response) => {
  return WebhookSubscriptionModel.findById(
    request.params.id
  ).then((subscription) => response.status(200).send(subscription));
});
app.delete("/subscription/:id", (request, response) => {
  const id = request.params.id;
  return WebhookSubscriptionModel.deleteOne({
    _id: mongoose.Types.ObjectId(id),
  })
    .then((deleted) => response.status(204).send(deleted))
    .catch((_) =>
      response.status(400).send({ reason: "Subscription not found" })
    );
});

app.get("/like/:id", (request, response) => {
  const id = request.params.id;
  getChannel()
    .then((channel) => {
      channel.assertQueue(WEBHOOK_QUEUE);
      channel.sendToQueue(
        WEBHOOK_QUEUE,
        Buffer.from(JSON.stringify({ eventType: "LIKED_POST", postId: id }))
      );
      console.log("message sent");
      return response.status(200).send({ postId: id, operation: "liked" });
    })
    .catch((error) => response.status(500).send({ reason: error }));
});

module.exports = app;

const mongoose = require("mongoose");
const amqplib = require("amqplib/callback_api");
const axios = require("axios");
const MONGO_URI = process.env.MONGO_URI;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((error) => console.log("Error connecting to mongo", error));

const WEBHOOK_QUEUE = "WebhookQueue";

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
      amqplib.connect(RABBITMQ_URL, (error, connection) => {
        if (error) return reject(error);
        connection.createChannel((channelError, c) => {
          if (channelError) return reject(channelError);
          return resolve(c);
        });
      });
  });
};

const handleDeliveries = () => getChannel().catch(handleDeliveries)

handleDeliveries().then(channel => {
  channel.assertQueue(WEBHOOK_QUEUE);
  channel.consume(WEBHOOK_QUEUE, (message) => {
    const stringPayload = message.content.toString('utf8');
    const payload = JSON.parse(stringPayload);
    getSubscriptions(payload).then(subscriptions => deliverWebhooks(subscriptions, payload))
  });
});


const getSubscriptions = (payload) =>
  WebhookSubscriptionModel.find({}).then((subscriptions) =>
    subscriptions.filter((subscription) =>
      subscription.eventTypes.includes(payload.eventType)
    )
  );

const deliverWebhooks = (subscriptions, payload) =>
  Promise.all(
    subscriptions.map((subscription) =>
      axios.post(
        subscription.url,
        {
          payload,
        },
        { "Content-Type": "application/json" }
      )
    )
  );
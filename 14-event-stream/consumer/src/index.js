var kafka = require("kafka-node");

var client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_HOST,
});

client.on("connect", (data) => {
  console.log("Connect:", data);
});

const clientConnectionListenerError = (err) => {
  console.error(
    `Error connecting to kafka client: ${err.stack || err.message}`,
    err
  );
};

client.once("error", clientConnectionListenerError);

client.once("ready", () => {
  console.log("Kafka client ready.");
  client.removeListener("error", clientConnectionListenerError);

  client.on("reconnect", (data) => {
    console.log("Reconnect:", data);
  });
});

const Consumer = kafka.Consumer;

const consumer = new Consumer(client, [{ topic: "topic1", partition: 1 }], {
  autoCommit: false,
});

const messageReceivedListener = (message) => {
  console.log("************************TOPIC RECV***************************");
  console.log(message);
  console.log(
    "************************TOPIC RECV***************************\n"
  );
};

consumer.on("message", messageReceivedListener);

process.on("uncaughtException", console.error);
process.on("unhandledRejected", console.error);
process.on("warning", console.log);

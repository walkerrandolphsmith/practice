var kafka = require('kafka-node');
var client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_HOST
});

client.on('connect', data => {
    console.log('Connect:', data);
  });

const handleError = error => {
    if (error) console.error("ERROR", error)
}

const clientConnectionListenerError = err => {
    console.error(`Error connecting to kafka client: ${err.stack || err.message}`, err);
};

client.once('error', clientConnectionListenerError);

client.once('ready', () => {
    console.log('Kafka client ready.');
    client.removeListener('error', clientConnectionListenerError);

    client.on('reconnect', data => {
        console.log('Reconnect:', data);
    });
});

var topic = {
    topic: 'topic1',
    partitions: 2,
    replicationFactor: 1
};

client.createTopics([topic], (error, result) => {
    console.log('************************TOPIC CREATION***************************')
    handleError(error)
    console.log(result);
    console.log('************************TOPIC CREATION COMPLETE***************************')
});

const Producer = kafka.Producer
const producer = new Producer(client)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const messageSentListener = result => {
    if (result) {
        console.log('************************SEND TOPIC***************************')
        console.log(result);
        console.log('************************TOPIC SENT***************************\n')
    }
}

const onSend = (error, result) => {
    handleError(error)
    messageSentListener(result)
}

producer.on('ready', async () => {
    while(true) {
        producer.send([
            { topic: 'topic1', messages: ['hi ' + Math.random()], partition: 0 },
            { topic: 'topic1', messages: ['hi ' + Math.random()], partition: 1 },
        ], onSend);
        await sleep(5000)
    }
});
 
producer.on('error', console.error)
process.on('uncaughtException', console.error);
process.on('unhandledRejected', console.error);
process.on('warning', console.log);
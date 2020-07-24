const kafka = require('kafka-node');
const express = require('express');
const bodyParser = require('body-parser');

const client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_HOST
});

client.on('connect', data => console.log('Connect:', data));
const clientConnectionListenerError = err => console.error(`Error connecting to kafka client: ${err.stack || err.message}`, err);
client.once('error', clientConnectionListenerError);
client.once('ready', () => {
    console.log('Kafka client ready.');
    client.removeListener('error', clientConnectionListenerError);
    client.on('reconnect', data => console.log('Reconnect:', data));
});
const Producer = kafka.Producer
const producer = new Producer(client)

const app = express();
app.use(bodyParser.json());

app.post('/topic', (request, response) => {
    const body = request.body;
    if (!body.name) return response.status(400).send({ reason: 'Topic requires a name' });
    if (!body.partitions) return response.status(400).send({ reason: 'Topic requires a number of partitions' });
    
    client.createTopics([{
        topic: body.name,
        partitions: body.partitions,
        replicationFactor: 1,
    }], (error, result) => {
        if (error) return response.status(500).send({ reason: error });
        return response.status(200).send({ result: result })
    });
});

app.post('/send', (request, response) => {
    const body = request.body;
    if (!body.topic) return response.status(400).send({ reason: 'Requires a topic' });
    if (!body.message) return response.status(400).send({ reason: 'Topic must have a message' });

    producer.send([
        { topic: body.topic, messages: [body.message], partitions: 0 },
        { topic: body.topic, messages: [body.message], partitions: 1 },
    ], (error, result) => {
        if (error) return response.status(500).send({ reason: error });
        return response.status(200).send({ result: result })
    });
})

app.post('/buy', (request, response) => {
    const body = request.body;
    if (!body.car) return response.status(400).send({ reason: 'Requires a topic' });

    producer.send([
        { topic: 'INVENTORY_CHANGE', type: 'BUY', messages: [JSON.stringify({ id: body.car, type: 'BUY' })], partitions: 0 },
        { topic: 'INVENTORY_CHANGE', type: 'BUY', messages: [JSON.stringify({ id: body.car, type: 'BUY' })], partitions: 1 },
    ], (error, result) => {
        if (error) return response.status(500).send({ reason: error });
        return response.status(200).send({ result: result })
    });
})

app.post('/sell', (request, response) => {
    const body = request.body;
    if (!body.car) return response.status(400).send({ reason: 'Requires a topic' });

    producer.send([
        { topic: 'INVENTORY_CHANGE', type: 'SELL', messages: [JSON.stringify({ id: body.car, type: 'SELL' })], partitions: 0 },
        { topic: 'INVENTORY_CHANGE', type: 'SELL', messages: [JSON.stringify({ id: body.car, type: 'SELL' })], partitions: 1 },
    ], (error, result) => {
        if (error) return response.status(500).send({ reason: error });
        return response.status(200).send({ result: result })
    });
})

const getCar = (id) => new Promise((resolve, reject) => {
    const messages = [];
    const Consumer = kafka.Consumer;
    const consumer = new Consumer(
        client,
        [
            { topic: 'INVENTORY_CHANGE', partition: 0, offset: 0 },
        ],
        {fromOffset: true}
      );
      consumer.on('message', (message) => {
          messages.push(message);
          if (message.offset === message.highWaterOffset - 1) {
              consumer.close(true, (err, mssg) => {
                console.log("consumer has been closed..");
                err ? reject(err) : resolve(messages)
              })
          }
      });
      consumer.on('error', reject);
})

app.get('/car/:id', (request, response) => {
    const id = request.params.id;
    return getCar(id)
    .then(messages => {
        const hydratedMessages = messages.map(message => Object.assign(message, { value: JSON.parse(message.value)}));
        const lastMessage = hydratedMessages[hydratedMessages.length - 1];
        const isSold = lastMessage.value.type === 'SELL';
        const numberOfPrebiousOwners = hydratedMessages.reduce((count, message) => {
            if (message.value.type === "BUY") count += 1;
            return count;
        }, 0)

        return {
            isSold,
            numberOfPrebiousOwners
        }
    })
    .then(data => response.status(200).send({ data: data }))
    .catch(error => response.status(500).send({ reason: error }))
})

process.on('uncaughtException', console.error);
process.on('unhandledRejected', console.error);
process.on('warning', console.log);

app.listen(3000, console.log)
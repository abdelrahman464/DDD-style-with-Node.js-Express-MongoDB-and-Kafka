const { Kafka, logLevel } = require('kafkajs');
const config = require('../config');

const kafka = new Kafka({
  clientId: config.kafkaClientId,
  brokers: config.kafkaBrokers,
  logLevel: logLevel.NOTHING,
  retry: { retries: 8, initialRetryTime: 300 },
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Kafka producer connected');
}

async function publish(event) {
  await producer.send({
    topic: config.kafkaTopic,
    messages: [{ value: JSON.stringify(event) }],
  });
  console.log(`Kafka event sent to "${config.kafkaTopic}"`);
}

async function startConsumer(handler) {
  const consumer = kafka.consumer({ groupId: config.kafkaGroupId });
  await consumer.connect();
  await consumer.subscribe({ topic: config.kafkaTopic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      await handler(event);
    },
  });
  console.log(`Kafka consumer listening on "${config.kafkaTopic}"`);
}

module.exports = { connectProducer, publish, startConsumer };

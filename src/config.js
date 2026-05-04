require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/postsdb',
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  kafkaClientId: process.env.KAFKA_CLIENT_ID || 'task-service',
  kafkaTopic: process.env.KAFKA_TOPIC || 'post.created',
  kafkaGroupId: process.env.KAFKA_GROUP_ID || 'task-consumer-group',
};

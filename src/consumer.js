const { kafkaClient, TOPIC, CLIENT_CODE } = require("./consts/config");

// Create a consumer
const consumer = kafkaClient(CLIENT_CODE).consumer({ groupId: "test-group-1" });

const consumeMessage = async () => {
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: TOPIC.LEAVE_GROUP, fromBeginning: true });

  // Consume messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        timestamp: message.timestamp,
        key: message.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
      });
    },
  });
};

// Call the function to consume messages
consumeMessage().catch(console.error);

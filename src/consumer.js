const { kafkaClient, TOPIC, CLIENT_CODE } = require("./consts/config");

// Create a consumer
const consumer = kafkaClient(CLIENT_CODE).consumer({ groupId: 'tada' });

const consumeMessage = async () => {
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: TOPIC.LEAVE_ACCRUAL, fromBeginning: false });

  // Consume messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Message received, partition:", partition);
      await sleep(3000);
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the function to consume messages
consumeMessage().catch(console.error);

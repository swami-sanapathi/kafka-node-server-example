// consumer.js
const { kafkaClient, TOPIC, CLIENT_CODE } = require("./consts/config");
const { createTopicIfNotExist } = require("./topic");

// Create a consumer
const consumer = kafkaClient(CLIENT_CODE).consumer({
  groupId: "cg-1",
  allowAutoTopicCreation: false,
});

const consumeMessage = async (topic) => {
  try {
    await createTopicIfNotExist(topic);
    await consumer.connect();

    // Subscribe to the topic
    await consumer.subscribe({
      topic,
      fromBeginning: false,
    });

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
  } catch (error) {
    console.log("error -->", error);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the function to consume messages
try {
  consumeMessage(TOPIC.LEAVE_ACCRUAL).catch(console.error);
} catch (error) {
  console.log("error -->", error);
}

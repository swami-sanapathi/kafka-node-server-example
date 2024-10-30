// consumer.js
const { kafkaClient, TOPIC, CLIENT_CODE } = require("./consts/config");
const { createTopicIfNotExist } = require("./topic");

const consumeMessage = async (topic) => {
  try {
    const consumer = kafkaClient(CLIENT_CODE).consumer({
      groupId: `cg-1-${topic}`, // Unique group ID for each topic
      allowAutoTopicCreation: false,
    });

    await consumer.connect();
    await createTopicIfNotExist(topic);
    await consumer.subscribe({
      topic,
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ partition, message }) => {
        try {
          console.log(
            "Message received from topic:",
            topic,
            "partition:",
            partition
          );
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
        } catch (error) {
          console.log("error -->", error);
        }
      },
    });
  } catch (error) {
    console.error(`Error consuming topic ${topic}:`, error);
  }
};

function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(reject, ms));
}

// Call the function to consume messages for each topic
const startConsumers = async () => {
  const consumerPromises = Object.values(TOPIC).map((topic) =>
    consumeMessage(topic)
  );
  await Promise.all(consumerPromises);
};

startConsumers().catch(console.error);

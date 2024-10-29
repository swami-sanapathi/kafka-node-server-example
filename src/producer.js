// producer.js
const { kafkaClient, TOPIC, CLIENT_CODE } = require("./consts/config");
const { config } = require("dotenv");
const { createTopicIfNotExist } = require("./topic");
config();

const produceMessage = async (topic, info) => {
  // Create a producer
  const producer = kafkaClient(CLIENT_CODE).producer({
    allowAutoTopicCreation: false,
    maxInFlightRequests: 1,
  });

  await createTopicIfNotExist(topic);
  await producer.connect();

  // Send message to the topic
  const result = await producer.send({
    topic,
    messages: [{ value: JSON.stringify(info) }],
  });

  console.log("Message sent:", result);
  await producer.disconnect();
};

// Call the function to produce a message
produceMessage(TOPIC.LEAVE_ACCRUAL, [{ number: 2 }]).catch(console.error);

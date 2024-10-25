// producer.js
const {
  kafkaClient,
  TOPIC,
  CLIENT_CODE,
  BROKERS_COUNT,
  PARTITIONS_COUNT,
} = require("./consts/config");
const { config } = require("dotenv");
config();

const createTopicIfNotExist = async (topic) => {
  const admin = kafkaClient(CLIENT_CODE).admin();

  await admin.connect();
  const existingTopics = await admin.listTopics();

  console.log(existingTopics);
  // If the existing topic is already in the cluster
  // then nothing to do here and return immediately
  if (existingTopics.includes(topic)) {
    console.log(`Topic "${topic}" already exists.`);
    await admin.disconnect();
    return;
  }

  await admin.createTopics({
    topics: [
      {
        topic,
        numPartitions: PARTITIONS_COUNT,
        replicationFactor: BROKERS_COUNT - 1,
      },
    ],
  });
  await admin.disconnect();
};

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
    messages: [{ key: crypto.randomUUID(), value: JSON.stringify(info) }],
  });

  console.log("Message sent:", result);
  await producer.disconnect();
};

// Call the function to produce a message
produceMessage(TOPIC.LEAVE_GROUP, [{ number: 2 }]).catch(console.error);

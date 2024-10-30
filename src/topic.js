// topic.js
const {
  PARTITIONS_COUNT,
  BROKERS_COUNT,
  kafkaClient,
  CLIENT_CODE,
} = require("./consts/config");

const createTopicIfNotExist = async (topic) => {
  const admin = kafkaClient(CLIENT_CODE).admin();

  await admin.connect();
  const existingTopics = await admin.listTopics();

  console.log({ existingTopics });
  // If the existing topic is already in the cluster
  // then nothing to do here and return immediately
  if (existingTopics.includes(topic)) {
    // console.log(`Topic "${topic}" already exists.`);

    // Fetch metadata for the topic
    const metadata = await admin.fetchTopicMetadata({ topics: [topic] });

    // Get the partition count from the topic metadata
    const topicInfo = metadata.topics.find((t) => t.name === topic);
    const partitionCount = topicInfo ? topicInfo.partitions.length : 0;

    // console.log(`Partition count for topic "${topic}":`, partitionCount);

    // If the partition count is greater than or equal to the expected partition count
    // then nothing to do here and return immediately
    if (partitionCount >= PARTITIONS_COUNT) {
      //   console.log(`Topic "${topic}" has the correct partition count.`);
      await admin.disconnect();
      return;
    }

    // If the partition count is less than the expected partition count
    // then create the partitions
    await admin.createPartitions({
      topicPartitions: [{ topic, count: BROKERS_COUNT }],
    });

    await admin.disconnect();
    return;
  }

  await admin.createTopics({
    topics: [
      {
        topic,
        numPartitions: PARTITIONS_COUNT,
        replicationFactor: BROKERS_COUNT > 1 ? BROKERS_COUNT : 1,
        // configEntries: [{ name: "retention.ms", value: "100" }], // 1 second
        // configEntries: [{ name: "cleanup.policy", value: "compact" }], // which will be used to compact the logs for the topic
      },
    ],
  });
  console.log(`Topic "${topic}" created.`);
  await admin.disconnect();
};

module.exports = {
  createTopicIfNotExist,
};

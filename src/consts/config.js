// config.js
const { Kafka } = require("kafkajs");
const { config } = require("dotenv");
config();

const CLIENT_ID = "CLIENT";
const CLIENT_CODE = "REC";
const PARTITIONS_COUNT = 3;
const TOPIC = {
  LEAVE_ACCRUAL: "leave-accrual",
  LEAVE_GROUP: "leave-group",
  LEAVE_GROUP_EVALUATION: "leave-group-evaluation",
};

// Initialize Kafka Instance
const brokers = process.env.BROKERS?.split(",").map((broker) => broker.trim());
let BROKERS_COUNT = brokers?.length ?? 0;

if (BROKERS_COUNT === 0) {
  throw new Error("BROKERS environment variable is not defined or empty");
}

function kafkaConfigurationFactory(code) {
  return new Kafka({
    clientId: `${CLIENT_ID}-${code}`,
    brokers,
    retry: {
      retries: 10,
      initialRetryTime: 500,
    },
  });
}

module.exports = {
  CLIENT_ID,
  CLIENT_CODE,
  BROKERS_COUNT,
  PARTITIONS_COUNT,
  TOPIC,
  kafkaClient: kafkaConfigurationFactory,
};

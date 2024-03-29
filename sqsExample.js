// Example: Launching a Chrysus Engine using SQS pub/sub
const { Chrysus } = require("./Chrysus");

// Choose a valid Chrysus type
let type = "sqs";

// Define the required parameters based on the specific type
let params = {
  sqsQueue: process.env.CHRYSUS_SQS_QUEUE,
  awsAccessKeyId: process.env.CHRYSUS_SQS_QUEUE,
  awsSecretAccessKey: process.env.CHRYSUS_AWS_SECRET_ACCESS_KEY
};

// Create an instance of Chrysus
const chrysus = new Chrysus(type, params); //@ts-check

// Launch the Chrysus Engine
chrysus.engine();

//@ts-check
// Example: Launching a Chrysus Engine using SQS pub/sub
const { Chrysus } = require("./Chrysus");

let type = "sqs";
let params = {
  sqsQueue: process.env.SQS_QUEUE,
  awsAccessKeyId: process.env.SQS_QUEUE,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const chrysus = new Chrysus(type, params);
chrysus.engine();

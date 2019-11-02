/**
 * @summary Chrysus Engine SQS Subscriber
 * @param {object} params - is required like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey}
 * @returns {object} res - {}
 * */
async function sqsSubscriber(params) {
  try {
    if (params) {
      // TODO: Actually validate these parameters!
      console.log(JSON.stringify(params, null, 2));
    }

    const { Consumer } = require("sqs-consumer");
    const { chrysusMessageValidator } = require("./chrysusMessageValidator");
    const sqsQueue = params.sqsQueue;

    const app = Consumer.create({
      queueUrl: sqsQueue,
      handleMessage: async message => {
        let messageId = await message.MessageId;
        let messageReceiptHandle = await message.ReceiptHandle;
        let messageMD5OfBody = await message.MD5OfBody;
        let chrysus = await chrysusMessageValidator(message.Body);
        if (chrysus) {
          console.log("MessageId: " + messageId);
          console.log("ReceiptHandle: " + messageReceiptHandle);
          console.log("MD5OfBody: " + messageMD5OfBody);
          console.log(JSON.stringify(chrysus, null, 2));
        }
      }
    });

    app.on("error", err => {
      console.error(err.message);
    });

    app.on("processing_error", err => {
      console.error(err.message);
    });

    app.start();

    //
  } catch (error) {
    console.error(error);
  }
}

module.exports.sqsSubscriber = sqsSubscriber;

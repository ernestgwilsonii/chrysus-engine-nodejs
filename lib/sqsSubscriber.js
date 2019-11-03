/**
 * @summary Chrysus Engine SQS Subscriber
 * @param {object} params - is required like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey }
 * @returns {object} res - {}
 * */
async function sqsSubscriber(params) {
  try {
    if (params) {
      // TODO: Actually validate these parameters!
      //console.log(JSON.stringify(params, null, 2));
      if (
        !params.sqsQueue ||
        !params.awsAccessKeyId ||
        !params.awsSecretAccessKey
      ) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for SQS to work! Try passing in a valid object like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey }";
        throw errMsg;
      }
    }

    const { Consumer } = require("sqs-consumer"); // REF: https://github.com/BBC/sqs-consumer
    const { chrysusMessageValidator } = require("./chrysusMessageValidator");
    const { ChrysusEngine } = require("./ChrysusEngine");
    const sqsQueue = params.sqsQueue;

    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    const sqsApp = Consumer.create({
      queueUrl: sqsQueue,
      handleMessage: async message => {
        let messageId = await message.MessageId;
        let messageReceiptHandle = await message.ReceiptHandle;
        let messageMD5OfBody = await message.MD5OfBody;
        let chrysusMessage = await chrysusMessageValidator(message.Body);
        // console.log(JSON.stringify(chrysus, null, 2));
        console.log(
          "handleMessage: SQS queue message is being handled: " + messageId
        );
        await sleep(10); // Wait a few ms to allow other workers (if any) to have a chance to take some queue load
        if (chrysusMessage) {
          // Pass along the SQS meta data inside the Chrysus message object
          chrysusMessage.message.meta.source = {
            sqs: {
              messageId: messageId,
              messageReceiptHandle: messageReceiptHandle,
              messageMD5OfBody: messageMD5OfBody
            }
          };

          // Send the valid Chrysus message to the Chrysus Engine for processing!
          const chrysusEngine = new ChrysusEngine(chrysusMessage);
          chrysusEngine.chrysusMessageReceived(chrysusMessage);
          // The SQS client will mark the SQS message as deleted (done) next, since Chrysus now has the ball!
        }
      }
    });

    // SQS client generic errors:
    sqsApp.on("error", err => {
      console.error(err.message);
    });

    // SQS client processing errors:
    sqsApp.on("processing_error", err => {
      console.error(err.message);
    });

    // SQS queue message has been received:
    sqsApp.on("message_received", async message => {
      //console.log("message_received: " + JSON.stringify(message, null, 2));
      let messageId = await message.MessageId;
      let messageReceiptHandle = await message.ReceiptHandle;
      let messageMD5OfBody = await message.MD5OfBody;
      let chrysus = await chrysusMessageValidator(message.Body);
      console.log(
        "message_received: SQS queue message has been received: " + messageId
      );
    });

    // After an SQS queue message has been processed:
    sqsApp.on("message_processed", async message => {
      //console.log("message_processed: " + JSON.stringify(message, null, 2));
      let messageId = await message.MessageId;
      let messageReceiptHandle = await message.ReceiptHandle;
      let messageMD5OfBody = await message.MD5OfBody;
      console.log(
        "message_processed: Message has been sent to Chrysus Engine, deleting from SQS queue: " +
          messageId
      );
    });

    // What to do with an empty SQS queue:
    sqsApp.on("empty", () => {
      //console.log("SQS queue is: empty at " + Date.now());
    });

    // Process the SQS queue:
    sqsApp.start();
  } catch (error) {
    console.error(error);
  }
}

module.exports.sqsSubscriber = sqsSubscriber;

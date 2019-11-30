const { Consumer } = require("sqs-consumer"); // REF: https://github.com/BBC/sqs-consumer
const { chrysusMessageValidator } = require("./chrysusMessageValidator");
const { ChrysusEngine } = require("./ChrysusEngine");
const { sleep } = require("./sleep");

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

    const sqsQueue = params.sqsQueue;
    const sqsApp = Consumer.create({
      queueUrl: sqsQueue,
      handleMessage: async message => {
        let messageId = await message.MessageId;
        let messageReceiptHandle = await message.ReceiptHandle;
        let messageMD5OfBody = await message.MD5OfBody;
        let chrysusMessage = await chrysusMessageValidator(message.Body);
        // console.log(JSON.stringify(chrysus, null, 2));
        console.log(
          "Chrysus sqsSubscriber - handleMessage: SQS queue message is being handled: " +
            messageId
        );
        await sleep(10); // Wait a few ms to allow other workers (if any) to have a chance to take some queue load
        if (chrysusMessage) {
          // Pass along the SQS meta data inside the Chrysus message object
          chrysusMessage.message.meta = {};
          chrysusMessage.message.meta.source = {
            sqs: {
              messageId: messageId,
              messageReceiptHandle: messageReceiptHandle,
              messageMD5OfBody: messageMD5OfBody
            }
          };

          // Send the valid Chrysus message to the Chrysus Engine for processing!
          const chrysusEngine = new ChrysusEngine(chrysusMessage);
          let res = await chrysusEngine.chrysusMessageReceived(chrysusMessage);
          //console.log("ChrysusEngine res:\n" + JSON.stringify(res, null, 2));
          if (res.chrysusStatus === "RECEIVED") {
            // Chrysus RECEIVED the Chrysus Message is is performing the next steps asynchronously!
            // console.log("ChrysusEngine sqsSubscriber Chrysus Message - res.chrysusStatus: " + res.chrysusStatus);
            // console.log("ChrysusEngine sqsSubscriber Chrysus Message - res.chrysusStatusMessage: " + res.chrysusStatusMessage);
            console.log(
              "ChrysusEngine sqsSubscriber Chrysus Message - chrysusMessageId: " +
                res.chrysusMessageId
            );
            // The SQS client will mark the SQS message as deleted (done) next, since Chrysus now has the ball!
          } else {
            // Chrysus FAILED and Chrysus will not take further action!
            // console.log("ChrysusEngine sqsSubscriber Chrysus Message - res.chrysusStatus: " + res.chrysusStatus);
            // console.log("ChrysusEngine sqsSubscriber Chrysus Message - res.chrysusStatusMessage: " + res.chrysusStatusMessage);
            console.log(
              "ChrysusEngine sqsSubscriber Chrysus Message - chrysusMessageId: " +
                res.chrysusMessageId
            );
            // The SQS client will not delete the SQS message from the SQS queue and it will be visible when the timeout expires!
          }
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
      let messageId = message.MessageId;
      // let messageReceiptHandle = message.ReceiptHandle;
      // let messageMD5OfBody = message.MD5OfBody;
      console.log(
        "Chrysus sqsSubscriber - message_received: SQS queue message has been received: " +
          messageId
      );

      // TODO: Complete Chrysus Message Format Validation!
      let chrysusMessageValidation = await chrysusMessageValidator(message.Body);
      if (chrysusMessageValidation) {
        // console.log("Chrysus sqsSubscriber - chrysusMessageValidation: " + JSON.stringify(chrysusMessageValidation, null, 2));
      }
    });

    // After an SQS queue message has been processed:
    sqsApp.on("message_processed", async message => {
      // console.log("message_processed: " + JSON.stringify(message, null, 2));
      let messageId = message.MessageId;
      // let messageReceiptHandle = message.ReceiptHandle;
      // let messageMD5OfBody = message.MD5OfBody;
      console.log(
        "Chrysus sqsSubscriber - message_processed: Message has been sent to the Chrysus Engine, deleting message from the SQS queue: " +
          messageId
      );
    });

    // What to do with an empty SQS queue:
    sqsApp.on("empty", () => {
      //console.log("SQS queue is: empty at " + Date.now());
    });

    // Process the SQS queue:
    await sqsApp.start();
  } catch (error) {
    console.error(error);
  }
}

module.exports.sqsSubscriber = sqsSubscriber;

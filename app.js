const { Consumer } = require("sqs-consumer");

const snsQueue = process.env.SNS_QUEUE || "https://sqs.eu-west-1.amazonaws.com/account-id/queue-name" ;

const app = Consumer.create({
  queueUrl: snsQueue,
  handleMessage: async message => {
    //console.log(message);
    let messageId = await message.MessageId;
    console.log("MessageId: " + messageId);
    let messageReceiptHandle = await message.ReceiptHandle;
    console.log("ReceiptHandle: " + messageReceiptHandle);
    let messageMD5OfBody = await message.MD5OfBody;
    console.log("MD5OfBody: " + messageMD5OfBody);
    let chrysus = await JSON.parse(message.Body);
    console.log(JSON.stringify(chrysus, null, 2));
  }
});

app.on("error", err => {
  console.error(err.message);
});

app.on("processing_error", err => {
  console.error(err.message);
});

app.start();

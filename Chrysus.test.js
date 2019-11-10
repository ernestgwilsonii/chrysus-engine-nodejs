const { Chrysus } = require("./Chrysus");

// TODO: Write more actual tests!
// REF: https://devhints.io/jest
// REF: https://www.youtube.com/watch?v=FgnxcUQ5vho
// REF: https://jestjs.io/docs/en/expect

test("Hello World from Jest!", () => {
  let myNum = 2;
  expect(myNum).toEqual(2);
});

test("Passing in an unknown type should fail!", () => {
  let type = "unknown"; // <--This type is unknown!
  let params = {
    sqsQueue: process.env.SQS_QUEUE,
    awsAccessKeyId: process.env.SQS_QUEUE,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };
  const chrysus = new Chrysus(type, params);
  expect(chrysus.engine()).toThrowErrorMatchingSnapshot();
});

test("Passing in an unknown type should reject!", () => {
  let type = "unknown"; // <--This type is unknown!
  let params = {
    sqsQueue: process.env.SQS_QUEUE,
    awsAccessKeyId: process.env.SQS_QUEUE,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };
  const chrysus = new Chrysus(type, params);
  expect.assertions(1);
  return expect(chrysus.engine()).rejects.toEqual(
    "CRITICAL: Chrysus client type: unknown! Try using one of: mqtt, redis or sqs"
  );
});

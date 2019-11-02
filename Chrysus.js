/**
 * @summary Chrysus Engine - Creates an Chrysus Engine instance based on the type specified
 * @param {string} type - is required like: "sqs" or "redis"
 * @param {object} params - is required and is based on the type like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey} or { redisHost, redisPort, redisPass, redisChan }
 * @returns {object} res - {}
 * */
class Chrysus {
  constructor(type, params) {
    if (typeof type == "string") {
      this.type = type;
    } else {
      throw "CRITICAL: Chrysus engine type is required and must be a string, try using sqs or redis";
    }

    if (typeof params == "object") {
      this.params = params;
    } else {
      throw "CRITICAL: Chrysus params based on the type are required and must be an object";
    }
  }

  engine() {
    let res = {};
    res.type = this.type;
    return new Promise((resolve, reject) => {
      // SQS
      if (this.type === "sqs") {
        const { sqsSubscriber } = require("./lib/sqsSubscriber");
        sqsSubscriber(this.params);
        console.log("Chrysus engine running: " + res.type);
        return resolve(res);
      }
      // Redis
      if (this.type === "redis") {
        const { redisSubscriber } = require("./lib/redisSubscriber");
        redisSubscriber(this.params);
        console.log("Chrysus engine running: " + res.type);
        return resolve(res);
      }
      // Unknown
      reject("CRITICAL: Chrysus engine type unknown!");
    });
  }
}
module.exports.Chrysus = Chrysus;

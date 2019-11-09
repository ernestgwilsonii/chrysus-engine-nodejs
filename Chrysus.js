/**
 * @summary Chrysus Engine - Creates an Chrysus Engine instance based on the type specified
 * @param {string} type - is required like: "sqs" or "redis"
 * @param {object} params - is required and is based on the type like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey} or { redisHost, redisPort, redisPass, redisChan } or { mqttHost, mmqttPort, mqttPass, mqttChan }
 * @returns {object} res - {}
 * */
class Chrysus {
  constructor(type, params) {
    if (typeof type == "string") {
      this.type = type;
    } else {
      throw "CRITICAL: Chrysus Engine type is required and must be a string, like: mqtt, redis or sqs";
    }

    if (typeof params == "object") {
      this.params = params;
    } else {
      throw "CRITICAL: Chrysus Engine parameters are required and are based on the type (mqtt, redis or sqs) and must be an object";
    }
  }

  engine() {
    let res = {};
    res.type = this.type;
    return new Promise((resolve, reject) => {
      // MQTT
      if (this.type === "mqtt") {
        const { redisSubscriber } = require("./lib/mqttSubscriber");
        redisSubscriber(this.params);
        console.log("Chrysus Engine type: " + res.type);
        resolve(res);
      }
      // Redis
      if (this.type === "redis") {
        const { redisSubscriber } = require("./lib/redisSubscriber");
        redisSubscriber(this.params);
        console.log("Chrysus Engine type: " + res.type);
        resolve(res);
      }
      // SQS
      if (this.type === "sqs") {
        const { sqsSubscriber } = require("./lib/sqsSubscriber");
        sqsSubscriber(this.params);
        console.log("Chrysus Engine type: " + res.type);
        resolve(res);
      }
      // Unknown
      reject(
        "CRITICAL: Chrysus Engine type: unknown! Try using one of: mqtt, redis or sqs"
      );
    });
  }
}
module.exports.Chrysus = Chrysus;

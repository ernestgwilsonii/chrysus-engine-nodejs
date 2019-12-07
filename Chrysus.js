//@ts-check
/**
 * @summary Chrysus Engine - Creates a Chrysus client instance based on the type specified
 * @param {string} type - is required like: "sqs" or "redis" or "mqtt" or "postgres"
 * @param {object} params - is required and is based on the type like: { sqsQueue, awsAccessKeyId, awsSecretAccessKey} or { redisHost, redisPort, redisPass, redisChan } or { mqttHost, mqttPort, mqttPass, mqttChan }
 * @returns Promise<object> res - returns the results
 * */
class Chrysus {
  constructor(type, params) {
    if (typeof type == "string") {
      this.type = type;
    } else {
      throw "CRITICAL: Chrysus client type is required and must be a string, like: mqtt, postgres, redis or sqs";
    }

    if (typeof params == "object") {
      this.params = params;
    } else {
      throw "CRITICAL: Chrysus client parameters are required and are based on the type (mqtt, postgres, redis or sqs) and must be an object";
    }
  }

  engine() {
    let res = {};
    res.type = this.type;
    return new Promise((resolve, reject) => {
      // MQTT
      if (this.type === "mqtt") {
        const { mqttSubscriber } = require("./lib/mqttSubscriber");
        mqttSubscriber(this.params);
        console.log("Chrysus client type: " + res.type);
        resolve(res);
      }
      // PostgreSQL
      if (this.type === "postgres") {
        const { postgresSubscriber } = require("./lib/postgresSubscriber");
        postgresSubscriber(this.params);
        console.log("Chrysus client type: " + res.type);
        resolve(res);
      }
      // Redis
      if (this.type === "redis") {
        const { redisSubscriber } = require("./lib/redisSubscriber");
        redisSubscriber(this.params);
        console.log("Chrysus client type: " + res.type);
        resolve(res);
      }
      // SQS
      if (this.type === "sqs") {
        const { sqsSubscriber } = require("./lib/sqsSubscriber");
        sqsSubscriber(this.params);
        console.log("Chrysus client type: " + res.type);
        resolve(res);
      }
      // Unknown
      reject(
        "CRITICAL: Chrysus client type: unknown! Try using one of: mqtt, redis or sqs"
      );
    });
  }
}
module.exports.Chrysus = Chrysus;

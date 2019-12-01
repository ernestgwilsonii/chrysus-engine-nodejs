//@ts-check
const redis = require("redis");
const { chrysusMessageValidator } = require("./chrysusMessageValidator");
const { ChrysusEngine } = require("./ChrysusEngine");
const { sleep } = require("./sleep");

/**
 * @summary Chrysus Engine Redis Subscriber
 * @param {object} params - like: { redisHost, redisPort, redisChan, redisPass }
 * @returns Promise<object> res - returns the results
 * */
async function redisSubscriber(params) {
  try {
    if (params) {
      console.log(
        "redisSubscriber params:\n" + JSON.stringify(params, null, 2)
      );
      // TODO: Actually validate these parameters!
      if (!params.redisHost || !params.redisPort || !params.redisChan) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for Redis to work! Try passing in a valid object like: { redisHost, redisPort, redisChan, redisPass }";
        throw errMsg;
      }
    }

    let redisHost = params.redisHost;
    let redisPort = params.redisPort;
    let redisChan = params.redisChan;

    // Create a Redis Pub/Sub style subscriber client
    const subscriber = redis.createClient(redisPort, redisHost);

    // Use a password protected Redis connection
    if (params.redisPass) {
      let redisPass = params.redisPass;
      let dbAuth = () => {
        subscriber.auth(redisPass);
      };
      subscriber.addListener("connected", dbAuth);
      subscriber.addListener("reconnected", dbAuth);
      dbAuth();
    }

    // Use a non-password Redis connection
    subscriber.addListener("connected", redisConnected => {
      console.log(redisConnected);
    });
    subscriber.addListener("reconnected", redisReconnected => {
      console.log(redisReconnected);
    });

    // Subscribe to a Redis channel and listen for messages
    subscriber.on("message", async (channel, message) => {
      // console.log(channel);
      // console.log(message);

      // Validate the Chrysus Message
      let chrysusMessage = await chrysusMessageValidator(message);
      // console.log(JSON.stringify(chrysusMessage, null, 2));

      // Send the message to the Chrysus Engine
      if (chrysusMessage) {
        // Pass along the SQS meta data inside the Chrysus message object
        chrysusMessage.message.meta = {};
        chrysusMessage.message.meta.source = { redis: { channel: channel } };
        // Send the valid Chrysus message to the Chrysus Engine for processing!
        const chrysusEngine = new ChrysusEngine(chrysusMessage);
        let res = await chrysusEngine.chrysusMessageReceived(chrysusMessage);
      }
    });

    //
    subscriber.subscribe(redisChan);

    //
    let res = {};
    return res;
  } catch (error) {
    console.error(error);
  }
}
module.exports.redisSubscriber = redisSubscriber;

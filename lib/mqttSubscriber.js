//@ts-check
const mqtt = require("mqtt"); // https://www.npmjs.com/package/mqtt
const { chrysusMessageValidator } = require("./chrysusMessageValidator");
const { ChrysusEngine } = require("./ChrysusEngine");
const { sleep } = require("./sleep");

/**
 * @summary Chrysus Engine MQTT Subscriber
 * @param {object} params - like: { host, port, protocolId, topic }
 * @returns Promise<object> res - returns the results
 * */
async function mqttSubscriber(params) {
  try {
    if (params) {
      console.log(
        "mqttSubscriber params:\n" + JSON.stringify(params, null, 2)
      );
      // TODO: Actually validate these parameters!
      if (!params.host || !params.port || !params.protocolId || !params.topic) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for MQTT to work! Try passing in a valid object like: { host, port, protocolId, topic }";
        throw errMsg;
      }
    }

    let host = params.host;
    let port = params.port;
    let protocolId = params.protocolId;
    let topic = params.topic;

    // Define options
    let options = {
      protocolId: protocolId,
      host: host,
      port: port,
      topic: topic,
      rejectUnauthorized: false
    };

    // Create an MQTT Pub/Sub style subscriber client
    const client = mqtt.connect(options);
    client.subscribe(topic);

    // On every message
    client.on("message", async (topic, mqttMessage) => {
      try {
        console.log(topic);
        console.log(mqttMessage.toString());
        // console.log(channel);
        // console.log(message);

        // Validate the Chrysus Message
        let chrysusMessage = await chrysusMessageValidator(mqttMessage);
        // console.log(JSON.stringify(chrysusMessage, null, 2));

        // Send the message to the Chrysus Engine
        if (chrysusMessage) {
          // Pass along the SQS meta data inside the Chrysus message object
          chrysusMessage.message.meta = {};
          chrysusMessage.message.meta.source = {
            mqtt: {
              host: host,
              port: port,
              protocolId: protocolId,
              topic: topic
            }
          };

          // Send the valid Chrysus message to the Chrysus Engine for processing!
          const chrysusEngine = new ChrysusEngine(chrysusMessage);
          let res = await chrysusEngine.chrysusMessageReceived(chrysusMessage);
          return res;
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
module.exports.mqttSubscriber = mqttSubscriber;

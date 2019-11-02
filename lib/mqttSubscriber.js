/**
 * @summary Chrysus Engine MQTT Subscriber
 * @param {object} params - is required like: { mqttHost, mqttPort, mqttPass, mqttChan }
 * @returns {object} res - {}
 * */
async function mqttSubscriber(params) {
  try {
    if (params) {
      // TODO: Actually validate these parameters!
      //console.log(JSON.stringify(params, null, 2));
      if (
        !params.mqttHost ||
        !params.mqttPort ||
        !params.mqttPass ||
        !params.mqttChan
      ) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for MQTT to work! Try passing in a valid object like: { mqttHost, mqttPort, mqttPass, mqttChan }";
        throw errMsg;
      }
    }
    // TODO: Complete the MQTT implementation, this is just a future place holder!
    let res = {};
    return res;
  } catch (error) {
    console.error(error);
  }
}
module.exports.mqttSubscriber = mqttSubscriber;

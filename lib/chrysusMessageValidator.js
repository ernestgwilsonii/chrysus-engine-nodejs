//@ts-check

/**
 * @summary Chrysus Message
 * @typedef {Object} chrysusMessage - A valid Chrysus Message format
 */

/**
 * @summary Chrysus Message Validator
 * @param {chrysusMessage} chrysusMessage - is required and should be a valid Chrysus Message
 * @returns Promise<object> res - returns the message object unaltered if it is a valid Chrysus Message
 * */
async function chrysusMessageValidator(chrysusMessage) {
  try {
    if (chrysusMessage) {
      // TODO: Actually validate the message format and ensure it is a valid Chrysus Message!
      //console.log(JSON.stringify(message, null, 2));
      let validChrysusMessage = JSON.parse(chrysusMessage);
      return validChrysusMessage;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.chrysusMessageValidator = chrysusMessageValidator;

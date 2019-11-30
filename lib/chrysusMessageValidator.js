//@ts-check
/**
 * @summary Chrysus Message Validator
 * @param {object} message - is required and should be a valid Chrysus Message
 * @returns Promise<object> res - returns the message object unaltered if it is a valid Chrysus Message
 * */
async function chrysusMessageValidator(message) {
  try {
    if (message) {
      // TODO: Actually validate the message format and ensure it is a valid Chrysus Message!
      //console.log(JSON.stringify(message, null, 2));
      let res = JSON.parse(message);
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.chrysusMessageValidator = chrysusMessageValidator;

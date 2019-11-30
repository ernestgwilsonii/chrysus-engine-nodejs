//@ts-check
/**
 * @summary Sleep utility function for adding arbitrary delay to simulate processing time
 * @param {number} milliseconds - is required and is the desired sleep time in milliseconds
 * @returns void
 * */
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports.sleep = sleep;

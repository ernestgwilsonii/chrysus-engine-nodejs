/**
 * @summary Chrysus Engine
 * @param {object} message - is required
 * @returns {object} res - {}
 * */
async function chrysusEngine(message) {
  try {
    if (message) {
      console.log(JSON.stringify(message, null, 2));
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.chrysusEngine = chrysusEngine;

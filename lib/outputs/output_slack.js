/**
 * @summary Chrysus Slack Output
 * @param {object} output - is required and must be valid Chrysus format
 * @returns {object} res - returns the results
 * */
async function output(output) {
  try {
    if (output) {
      let res = output;
      res.outputResults = {};

      // TODO: Do the output
      res.outputResults.output = "Slack";

      return res;
    }
  } catch (error) {
    console.error(error);
    let err = output;
    err.outputResults = {};
    err.outputResults = error;
  }
}
module.exports.output = output;

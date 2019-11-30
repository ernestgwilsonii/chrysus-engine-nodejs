//@ts-check
/**
 * @summary Chrysus Console Output
 * @param {object} output - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function output(output) {
  try {
    if (output) {
      let res = output;
      res.outputResults = {};

      // TODO: Do the output
      res.outputResults.output = "Chrysus Console Output!";

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

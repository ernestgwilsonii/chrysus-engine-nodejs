/**
 * @summary Blah
 * @param {string} target - is required and
 * @returns {object} res - returns the
 * */
async function task(target) {
  try {
    if (target) {
      let res = "Target responded to trace: " + target;
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.task = task;

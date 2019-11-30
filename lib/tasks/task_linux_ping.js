//@ts-check
/**
 * @summary Chrysus Linux Ping Task
 * @param {object} task - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function task(task) {
  try {
    if (task) {
      let res = task;
      res.taskResults = {};

      // TODO: Do the task
      res.taskResults.taskOutput = "PING Boom!";
      
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.task = task;

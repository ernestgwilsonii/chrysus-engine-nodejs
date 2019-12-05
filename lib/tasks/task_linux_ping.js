//@ts-check
const { exec } = require("child-process-promise"); // https://www.npmjs.com/package/child-process-promise

/**
 * @summary Chrysus Linux Ping Task
 * @param {object} task - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function task(task) {
  try {
    if (task) {
      // console.log("\n\ntask:\n" + JSON.stringify(task, null, 2) + "\n\n");

      // Copy the task
      let res = { ...task };
      res.taskResults = {};
      res.meta.fullOutput = {};

      // REGEX count validator
      let count = task.taskDetails.count.toString();
      let countRegex = /[\;\$\&\|\?\<\>\!\@\#\%\^\(\)\'\"\:\~\`\+\{\}\[\]']/; // Use regex to look for unsafe characters
      let regexCountValidator = count.match(countRegex);
      if (regexCountValidator) {
        let thisWarning =
          "Sorry, " +
          task.taskName +
          " requires valid characters for the count!";
        res.taskResults.taskOutput = thisWarning;
        return res;
      }

      // REGEX target validator
      let target = task.taskDetails.target;
      let targetRegex = /[\;\$\&\|\?\<\>\!\@\#\%\^\(\)\'\"\:\~\`\+\{\}\[\]']/; // Use regex to look for unsafe characters
      let regexTargetValidator = target.match(targetRegex);
      if (regexTargetValidator) {
        let thisWarning =
          "Sorry, " +
          task.taskName +
          " requires valid characters for the target!";
        res.taskResults.taskOutput = thisWarning;
        return res;
      }

      // Perform the ping!
      res.meta.fullOutput = await exec(`ping -c ${count} ${target}`);
      // console.log("res.meta.fullOutput\n" + res.meta.fullOutput);
      // console.log("res.meta.fullOutput.stdout:\n" + res.meta.fullOutput.stdout);
      res.taskResults = res.meta.fullOutput.stdout;
      return res;
    }
  } catch (error) {
    console.error(error);
    // Copy the task
    let res = { ...task };
    res.taskResults = {};
    res.meta.fullOutput = {};
    res.taskResults = error;
    return res;
  }
}
module.exports.task = task;

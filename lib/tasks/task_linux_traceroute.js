//@ts-check
const { exec } = require("child-process-promise"); // https://www.npmjs.com/package/child-process-promise

/**
 * @summary Chrysus Linux Trace Task
 * @param {object} task - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function task(task) {
  try {
    if (task) {
      // console.log("\n\ntask:\n" + JSON.stringify(task, null, 2) + "\n\n");
      let res = task;
      res.taskResults = {};
      res.meta.fullOutput = {};

      // REGEX max_ttl validator
      let maxTtl = task.taskDetails.max_ttl.toString();
      let countRegex = /[\;\$\&\|\?\<\>\!\@\#\%\^\(\)\'\"\:\~\`\+\{\}\[\]']/; // Use regex to look for unsafe characters
      let regexCountValidator = maxTtl.match(countRegex);
      if (regexCountValidator) {
        let thisWarning =
          "Sorry, " +
          task.taskName +
          " requires valid characters for the max_ttl!";
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

      // Perform the traceroute!
      res.meta.fullOutput = await exec(`traceroute -m ${maxTtl} ${target}`);
      res.taskResults = res.meta.fullOutput.stdout;
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports.task = task;

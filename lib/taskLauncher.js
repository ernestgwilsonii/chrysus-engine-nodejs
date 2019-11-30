//@ts-check
const fs = require("fs");

/**
 * @summary Chrysus Task Launcher
 * @param {object} chrysusTask - is required and must be valid Chrysus message format
 * @returns Promise<object> res - returns the results
 * */
async function taskLauncher(chrysusTask) {
  try {
    if (chrysusTask) {
      console.log("taskLauncher - chrysusTask: " + chrysusTask.taskName);
      let taskPath = "./tasks/" + chrysusTask.taskName;
      console.log("taskLauncher - taskPath: " + taskPath);
      let taskFileName = chrysusTask.taskName + ".js";
      console.log("taskLauncher - taskFileName: " + taskFileName);

      // Dynamic list of Chrysus Tasks!
      let dirList = await fs.readdirSync("./lib/tasks");
      // console.log(dirList);
      if (dirList.includes(chrysusTask.taskName + ".js")) {
        console.log("TASK FILE FOUND: " + taskFileName);
        const { task } = require(taskPath);
        let res = await task(chrysusTask);
        // console.log("res: " + JSON.stringify(res));
        return res;
      } else {
        let err = chrysusTask;
        err.taskResults = {};
        err.taskResults.taskOutput = "TASK FILE NOT FOUND: " + taskFileName;
        console.log(err);
        return err;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.taskLauncher = taskLauncher;

/**
 * @summary Blah
 * @param {string} target - is required and
 * @returns {object} res - returns the
 * */
async function taskLauncher(target, taskName) {
  try {
    if (target) {
      taskPath = "./" + taskName;

      console.log("taskLauncher - taskPath: " + taskPath);
      // console.log("taskLauncher - target: " + target);
      console.log("taskLauncher - taskName: " + taskName);

      const { task } = await require(taskPath);
      let res = await task(target);
      // console.log("res: " + JSON.stringify(res));
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}

async function launchIt(target, taskName) {
  try {
    if (target) {
      //console.log("launchIt - taskName: " + taskName + " target: " + target);
      let res = await taskLauncher(target, taskName);
      console.log("res: " + JSON.stringify(res));
    }
  } catch (error) {
    console.error(error);
  }
}

let taskTypesArray = ["task_linux_ping", "task_linux_trace"];
//let taskTypesArray = ["task_linux_ping"];
for (taskName of taskTypesArray) {
  let target = "127.0.0.1";
  launchIt(target, taskName);
}

// let target = "127.0.0.1";
// taskLauncher(target);

module.exports.taskLauncher = taskLauncher;

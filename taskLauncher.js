// https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/
// node -r esm taskLauncher.js
// node --experimental-modules taskLauncher.js

/**
 * @summary Blah
 * @param {string} target - is required and
 * @returns {object} res - returns the
 * */
async function taskLauncher(target, taskName) {
  try {
    if (target) {
      taskPath = "./" + taskName+ ".mjs";
      
      console.log("taskLauncher - taskPath: " + taskPath);
      // console.log("taskLauncher - target: " + target);
      console.log("taskLauncher - taskName: " + taskName);

      let module = await import(taskPath);
      let res = await module.task(target);
      console.log("output: " + JSON.stringify(res));
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
      //console.log(res);
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

module.exports.taskLauncher = taskLauncher;

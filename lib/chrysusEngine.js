const events = require("events");
const chrysusEmitter = new events.EventEmitter();
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * @summary ChrysusEngine -
 * @param {object} message - is required and
 * @returns {object} res - {}
 * */
class ChrysusEngine {
  constructor(message) {
    if (typeof message == "object") {
      this.message = message;
    } else {
      throw "CRITICAL: ChrysusEngine message is required and it must be an object";
    }
  }

  chrysusMessageReceived(message) {
    return new Promise(async (resolve, reject) => {
      if (message) {
        let res = message;
        //await sleep(35000); // Simulate some processing delay!
        //console.log("chrysusMessageReceived:\n" + JSON.stringify(res, null, 2));
        chrysusEmitter.emit("callTasksSplitter", message); // Send the message to the Chrysus Tasks Splitter
        resolve(res);
      }
      reject("CRITICAL: ChrysusEngine.chrysusMessageReceived - No message!");
    });
  }
}

// Iterate over the tasks array and send each individual task to the Chrysus Task Dissector for processing
chrysusEmitter.on("callTasksSplitter", async chrysusMessage => {
  await sleep(100); // Simulate some processing delay!
  // console.log("ChrysusEngine callTasksSplitter:\n" + JSON.stringify(chrysusMessage, null, 2));
  let tasksArray = chrysusMessage.message.tasks;
  // console.log("ChrysusEngine tasksArray:\n" + JSON.stringify(tasksArray, null, 2));
  for (let thisTask of tasksArray) {
    thisTask.meta = chrysusMessage.message.meta;
    // console.log("ChrysusEngine thisTask:\n" + JSON.stringify(thisTask, null, 2));
    chrysusEmitter.emit("callTaskDissector", thisTask); // Send the thisTask to the Chrysus Task Dissector
  }
});

// Process each individual task using the Chrysus Task Dissector
chrysusEmitter.on("callTaskDissector", async chrysusTask => {
  //await sleep(2000); // Simulate some processing delay!
  console.log(
    "ChrysusEngine callTaskDissector:\n" + JSON.stringify(chrysusTask, null, 2)
  );
});

module.exports.ChrysusEngine = ChrysusEngine;

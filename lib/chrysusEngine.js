const events = require("events");
const chrysusEmitter = new events.EventEmitter();
const uuidv1 = require('uuid/v1');
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * @summary ChrysusEngine - processes valid Chrysus Messages, does each task and sends the results to each output!
 * @param {object} message - is required and must be a valid Chrysus Message
 * @returns {object} res - returns the original message along with a chrysusStatus, chrysusStatusMessage and chrysusMessageId
 * */
class ChrysusEngine {
  constructor(message) {
    if (typeof message == "object") {
      this.message = message;
    } else {
      throw "CRITICAL: A ChrysusEngine message object is required! Did you pass in a valid (properly formatted) Chrysus Message?";
    }
  }

  chrysusMessageReceived(message) {
    return new Promise(async (resolve, reject) => {
      let chrysusMsgId = uuidv1();
      if (message) {
        let res = message;
        res.chrysusStatus = "RECEIVED";
        res.chrysusStatusMessage = "ChrysusEngine: Chrysus Message received: " + chrysusMsgId;
        res.chrysusMessageId = chrysusMsgId;
        res.message.meta.chrysusMessageId = chrysusMsgId;
        res.message.meta.chrysusStatus = res.chrysusStatus;
        // await sleep(35000); // Simulate some processing delay!
        // console.log("chrysusMessageReceived:\n" + JSON.stringify(res, null, 2));
        chrysusEmitter.emit("callTasksSplitter", res); // Send the message to the Chrysus Tasks Splitter
        resolve(res);
      }
      let err = {};    
      err.chrysusStatusMessage = "CRITICAL: ChrysusEngine.chrysusMessageReceived - No message!";
      err.chrysusStatus = "FAILURE"
      err.chrysusMessageId = chrysusMsgId;
      reject(err);
    });
  }
}

// Loop over the tasks array and send each individual task to the Chrysus Task Dissector for processing
chrysusEmitter.on("callTasksSplitter", async chrysusMessage => {
  chrysusMessage.chrysusStatus = "TASKSPLITTER";
  chrysusMessage.message.meta.chrysusStatus = chrysusMessage.chrysusStatus;
  // await sleep(3000); // Simulate some processing delay!
  // console.log("ChrysusEngine callTasksSplitter:\n" + JSON.stringify(chrysusMessage, null, 2));
  let tasksArray = chrysusMessage.message.tasks;
  // console.log("ChrysusEngine tasksArray:\n" + JSON.stringify(tasksArray, null, 2));
  for (let thisTask of tasksArray) {
    thisTask.meta = chrysusMessage.message.meta;
    thisTask.meta.chrysusStatus = "TASKSPLITTER";
    // console.log("ChrysusEngine thisTask:\n" + JSON.stringify(thisTask, null, 2));
    chrysusEmitter.emit("callTaskDissector", thisTask); // Send the thisTask to the Chrysus Task Dissector
  }
});

// Process each individual task using the Chrysus Task Dissector
chrysusEmitter.on("callTaskDissector", async chrysusTask => {
  chrysusTask.meta.chrysusStatus = "TASKDISSECTOR";
  await sleep(100); // Simulate some processing delay!
  console.log(
    "ChrysusEngine callTaskDissector:\n" + JSON.stringify(chrysusTask, null, 2)
  );
});

module.exports.ChrysusEngine = ChrysusEngine;

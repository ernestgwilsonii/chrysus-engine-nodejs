//@ts-check
const events = require("events");
const uuidv1 = require("uuid/v1"); // Based on time v1
const uuidv4 = require("uuid/v4"); // Random v4
const { taskLauncher } = require("./taskLauncher");
const { outputProcessor } = require("./outputProcessor");
const { sleep } = require("./sleep");
const chrysusEmitter = new events.EventEmitter();

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
      try {
        let chrysusMsgId = await uuidv1();
        if (message) {
          let res = message;
          res.chrysusStatus = "RECEIVED";
          res.chrysusStatusMessage =
            "ChrysusEngine: Chrysus Message received: " + chrysusMsgId;
          res.chrysusMessageId = chrysusMsgId;
          res.message.meta.chrysusMessageId = chrysusMsgId;
          res.message.meta.chrysusStatus = res.chrysusStatus;
          // await sleep(35000); // Simulate some processing delay!
          // console.log("chrysusMessageReceived:\n" + JSON.stringify(res, null, 2));
          await chrysusEmitter.emit("callTasksSplitter", res); // Send the message to the Chrysus Tasks Splitter
          resolve(res);
        }
        let err = {};
        err.chrysusStatusMessage =
          "CRITICAL: ChrysusEngine.chrysusMessageReceived - No message!";
        err.chrysusStatus = "FAILURE";
        err.chrysusMessageId = chrysusMsgId;
        reject(err);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

// Loop over the tasks array and send each individual task to the Chrysus Task Launcher
chrysusEmitter.on("callTasksSplitter", async chrysusMessage => {
  try {
    chrysusMessage.message.meta.chrysusStatus = "TASK_SPLITTER";
    // await sleep(3000); // Simulate some processing delay!
    // console.log("ChrysusEngine callTasksSplitter:\n" + JSON.stringify(chrysusMessage, null, 2));

    // Copy the array, don't mutate the original
    let tasksArray = chrysusMessage.message.tasks.map(x => x);
    // console.log("ChrysusEngine tasksArray:\n" + JSON.stringify(tasksArray, null, 2));
    for (let thisTask of tasksArray) {
      // await sleep(3000); // Simulate some processing delay!

      // Copy the meta data
      thisTask.meta = Object.assign({}, chrysusMessage.message.meta);

      // Give each task a unique id for logging
      thisTask.meta.chrysusTaskId = await uuidv4();

      // console.log("ChrysusEngine thisTask:\n" + JSON.stringify(thisTask, null, 2));
      await chrysusEmitter.emit("callTaskLauncher", thisTask); // Send this task to the Chrysus Task Launcher
    }
  } catch (error) {
    console.error(error);
  }
});

// Process each individual task using the Chrysus Task Launcher
chrysusEmitter.on("callTaskLauncher", async chrysusTask => {
  try {
    chrysusTask.meta.chrysusStatus = "TASK_LAUNCHER";
    // await sleep(2000); // Simulate some processing delay!
    //console.log("ChrysusEngine callTaskLauncher:\n" + JSON.stringify(chrysusTask, null, 2));
    let taskResults = await taskLauncher(chrysusTask);
    // await sleep(2000); // Simulate some processing delay!
    // console.log("ChrysusEngine taskResults:\n" + JSON.stringify(taskResults, null, 2));
    await chrysusEmitter.emit("callOutputProcessor", taskResults); // Send the results to the Chrysus Output Processor
  } catch (error) {
    console.error(error);
  }
});

// Send each individual task results to the Chrysus Output Processor
chrysusEmitter.on("callOutputProcessor", async chrysusTaskResults => {
  try {
    // console.log("ChrysusEngine chrysusTaskResults:\n" + JSON.stringify(chrysusTaskResults, null, 2));

    for (let thisOutput of chrysusTaskResults.outputs) {
      // console.log(thisOutput);
      chrysusTaskResults.outputs = thisOutput;
      // console.log("chrysusTaskResults:\n" + JSON.stringify(chrysusTaskResults, null, 2));

      //
      chrysusTaskResults.meta.chrysusStatus = "OUTPUT_PROCESSOR";

      // await sleep(2000); // Simulate some processing delay!
      // console.log("ChrysusEngine chrysusTaskResults:\n" + JSON.stringify(chrysusTaskResults, null, 2));
      let outputResults = await outputProcessor(chrysusTaskResults);
      console.log(
        "ChrysusEngine outputResults:\n" +
          JSON.stringify(outputResults, null, 2)
      );
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports.ChrysusEngine = ChrysusEngine;

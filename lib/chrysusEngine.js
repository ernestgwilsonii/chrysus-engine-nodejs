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
        await sleep(35000); // Simulate some processing delay!
        console.log("chrysusMessageReceived:\n" + JSON.stringify(res, null, 2));

        // TODO: Actually implement the real Chrysus Engine work flow!
        chrysusEmitter.emit("GetToWork", message); // Example of sending to a fictional next step!

        resolve(res);
      }
      reject("CRITICAL: ChrysusEngine.chrysusMessageReceived - No message!");
    });
  }
}

// Fictional example of a next step!
// TODO: Actually implement the real Chrysus Engine work flow!
chrysusEmitter.on("GetToWork", async message => {
  await sleep(15000); // Simulate some processing delay!
  console.log("ChrysusEngine GetToWork:\n" + JSON.stringify(message, null, 2));
});

module.exports.ChrysusEngine = ChrysusEngine;

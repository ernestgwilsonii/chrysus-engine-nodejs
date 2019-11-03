const events = require("events");
const chrysusEmitter = new events.EventEmitter();

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * @summary chrysusEngine -
 * @param {object} message - is required and
 * @returns {object} res - {}
 * */
class ChrysusEngine {
  constructor(message) {
    if (typeof message == "object") {
      this.message = message;
    } else {
      throw "CRITICAL: chrysusEngine message is required and must be an object";
    }

    chrysusEmitter.on("chrysusMessageReceived", async message => {
      //await sleep(15000);
      this.chrysusMessageReceived();
      return new Promise((resolve, reject) => {
        if (this.message) {
          let res = this.message;
          resolve(res);
        }
        reject(
          "CRITICAL: No message!"
        );
      });
    });
  }

  chrysusMessageReceived(message) {
    console.log("chrysusMessageReceived:\n" + JSON.stringify(message, null, 2));
  }
}

module.exports.ChrysusEngine = ChrysusEngine;

//@ts-check
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const { sleep } = require("./sleep");

/**
 * @summary Chrysus Output Processor
 * @param {object} chrysusTaskResults - is required and must be valid Chrysus message format
 * @returns Promise<object> res - returns the results
 * */
async function outputProcessor(chrysusTaskResults) {
  try {
    if (chrysusTaskResults) {
      // Simulate delay
      // await sleep(1000);

      // console.log("outputProcessor - chrysusTaskResults:\n" + JSON.stringify(chrysusTaskResults, null, 2));
      let outputPath = "./outputs/" + chrysusTaskResults.outputs.outputName;
      // console.log("outputProcessor - outputPath: " + outputPath);
      let outputFileName = chrysusTaskResults.outputs.outputName + ".js";
      console.log("outputProcessor - outputFileName: " + outputFileName);

      // Give each output job a unique id for logging
      chrysusTaskResults.meta.chrysusOutputId = await uuidv4();

      // Dynamic list of Chrysus Outputs!
      let dirList = await fs.readdirSync("./lib/outputs");
      // console.log(dirList);
      if (dirList.includes(outputFileName)) {
        console.log("OUTPUT FILE FOUND: " + outputFileName);
        let { output } = await require(outputPath);
        let res = await output(chrysusTaskResults);
        // console.log("res: " + JSON.stringify(res));
        return res;
      } else {
        let err = chrysusTaskResults;
        err.outputResults = {};
        err.outputResults.resultsOutput =
          "OUTPUT FILE NOT FOUND: " + outputFileName;
        console.log(err);
        return err;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.outputProcessor = outputProcessor;

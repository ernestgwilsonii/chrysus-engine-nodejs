const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
/**
 * @summary Chrysus Output Processor
 * @param {object} chrysusTaskResults - is required and must be valid Chrysus message format
 * @returns {object} res - returns the results
 * */
async function outputProcessor(chrysusTaskResults) {
  try {
    if (chrysusTaskResults) {
      // Process each output in the Chrysus outputs array!
      let results = [];
      for (let thisOutput of chrysusTaskResults.outputs) {
        await sleep(5000);
        console.log("outputProcessor - chrysusTaskResults: " + thisOutput.outputName);
        let outputPath = "./outputs/" + thisOutput.outputName;
        console.log("outputProcessor - outputPath: " + outputPath);
        let outputFileName = thisOutput.outputName + ".js";
        console.log("outputProcessor - outputFileName: " + outputFileName);

        const fs = require("fs");
        let dirList = await fs.readdirSync("./lib/outputs");
        console.log(dirList);
        if (dirList.includes(thisOutput.outputName + ".js")) {
          console.log("OUTPUT FILE FOUND: " + outputFileName);
          let { output } = await require(outputPath);
          let res = await output(chrysusTaskResults);
          console.log("res: " + JSON.stringify(res));
          console.log("##########\n");
          results.push(res);
        } else {
          let err = chrysusTaskResults;
          err.outputResults = {};
          err.outputResults.resultsOutput =
            "OUTPUT FILE NOT FOUND: " + outputFileName;
          console.log(err);
          results.push(err);
        }
      }
      return results;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.outputProcessor = outputProcessor;

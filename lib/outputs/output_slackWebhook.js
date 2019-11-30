//@ts-check
const { IncomingWebhook } = require("@slack/webhook");

/**
 * @summary Chrysus Slack Output
 * @param {object} output - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function output(output) {
  try {
    if (output) {
      let res = output;
      res.outputResults = {};
      const webhook = new IncomingWebhook(output.outputs.outputDetails.url);
      res.outputs.outputDetails = "";
      res.meta.fullOutput = "";
      res.meta.taskResults = "";
      //let resultsData = res.taskResults;
      let resultsData = res;
      let slackText = JSON.parse(
        `{"text":{"type":"mrkdwn","text": ${JSON.stringify(resultsData)}}}`
      );
      let status = await webhook.send(JSON.stringify(slackText));
      if (status) {
        res.outputResults.output = "Chrysus Slack Webhook Output - SENT!";
        return res;
      }
      res.outputResults.output = "Chrysus Slack Webhook Output - FAILED!";
      return res;
    }
  } catch (error) {
    console.error(error);
    let err = output;
    err.outputResults = {};
    err.outputResults = error;
  }
}
module.exports.output = output;

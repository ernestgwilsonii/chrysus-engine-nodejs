//@ts-check
const { IncomingWebhook } = require("@slack/webhook"); // https://slack.dev/node-slack-sdk/webhook and https://slack.dev/node-slack-sdk/
// REF: https://api.slack.com/messaging/webhooks

/**
 * @summary Chrysus Slack Output
 * @param {object} output - is required and must be valid Chrysus format
 * @returns Promise<object> res - returns the results
 * */
async function output(output) {
  try {
    if (output) {
      // Copy the output
      let res = { ...output };
      res.outputResults = {};

      // TODO: Complete the Chrysus Slack Webhook Output features TBD

      // Create the Slack webhook
      const webhook = new IncomingWebhook(output.outputs.outputDetails.url);

      // Sanitize the output / remove data that should not be sent nor logged
      delete res.outputs.outputDetails;
      delete res.meta.fullOutput;
      delete res.meta.taskResults;

      let resultsData = res.taskResults;
      // let resultsData = res;
      // let slackText = JSON.parse(`{"text":{"type":"mrkdwn","text": ${JSON.stringify(resultsData)}}}`);
      // let status = await webhook.send(JSON.stringify(resultsData));

      // Send the Slack webhook
      let status = await webhook.send(resultsData);
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

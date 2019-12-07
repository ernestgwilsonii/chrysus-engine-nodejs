//@ts-check
const pg = require("pg"); // https://github.com/brianc/node-postgres
const { chrysusMessageValidator } = require("./chrysusMessageValidator");
const { ChrysusEngine } = require("./ChrysusEngine");
const { sleep } = require("./sleep");
let channel = "chrysus";

/**
 * @summary Chrysus Engine PostgreSQL Listener (Subscriber)
 * @param {object} params - like: { host, port, protocolId, topic }
 * @returns Promise<object> res - returns the results
 * */
async function postgresSubscriber(params) {
  try {
    if (params) {
      // await sleep(2000); // Simulate some processing delay!
      console.log(
        "postgresSubscriber params:\n" + JSON.stringify(params, null, 2)
      );
      // TODO: Actually validate these parameters!
      if (!params.host || !params.user || !params.password || !params.db || !params.table) {
        let errMsg =
          "CRITICAL: Chrysus Engine requires parameters for PostgreSQL to work! Try passing in a valid object like: { host, user, password, db, table }";
        throw errMsg;
      }
    }

    let host = params.host;
    let user = params.user;
    let password = params.password;
    let db = params.db;
    let table = params.table;

    // Define postgres connection config
    let config = {
      user: user,
      password: password,
      host: host,
      db: db,
      table: table
    };

    // PostgreSQL Connection String
    let connectionString = `postgres://${config.user}:${config.password}@${config.host}/${config.db}`;

    // Create a new PostgreSQL client instance
    const client = new pg.Client(connectionString);

    // Connect to PostgreSQL
    client.connect();

    // Listen to PostgreSQL on a channel
    client.query("LISTEN " + channel);

    // Log any notices
    client.on("notice", async postgresNotice => {
      console.warn("notice:", postgresNotice);
    });

    // Take action on notifications
    client.on("notification", async postgresNotification => {
      try {
        //console.log("postgresNotification.channel: " + postgresNotification.channel);
        //console.log("postgresNotification.payload: " + postgresNotification.payload);

        // Validate the Chrysus Message
        let chrysusMessage = await chrysusMessageValidator(
          JSON.parse(postgresNotification.payload)
        );
        //console.log(JSON.stringify(chrysusMessage, null, 2));

        // Send the message to the Chrysus Engine
        if (chrysusMessage) {
          // Pass along the SQS meta data inside the Chrysus message object
          chrysusMessage.message.meta = {};
          chrysusMessage.message.meta.source = {
            postgres: {
              host: host,
              channel: postgresNotification.channel,
              user: user,
              db: db,
              table: table
            }
          };

          // Send the valid Chrysus message to the Chrysus Engine for processing!
          const chrysusEngine = new ChrysusEngine(chrysusMessage);
          let res = await chrysusEngine.chrysusMessageReceived(chrysusMessage);
          return res;
        }
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
module.exports.postgresSubscriber = postgresSubscriber;

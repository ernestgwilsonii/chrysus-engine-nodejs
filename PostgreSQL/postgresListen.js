//@ts-check
// REF: https://node-postgres.com/api/client
const pg = require("pg"); // https://github.com/brianc/node-postgres
let channel = "chrysus";
const json = require("../Chrysus_Example_Messages/example_task_linux_ping.json"); // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
let chrysusMessage = JSON.stringify(json);

// PostgreSQL connection params
let config = {
  user: "postgres",
  password: "mysecretpassword",
  host: "127.0.0.1",
  db: "chrysus",
  table: "events"
};

// PostgreSQL Connection String
let connectionString = `postgres://${config.user}:${config.password}@${config.host}/${config.db}`;

// Create a new PostgreSQL client instance
const client = new pg.Client(connectionString);

// Connect to PostgreSQL
client.connect();

// Listen to PostgreSQL on a channel
client.query("LISTEN " + channel);

// Take action on notifications
client.on("notification", async msg => {
  console.log("msg.channel: " + msg.channel);
  console.log("msg.payload: " + msg.payload);
});

// Send a notification
//client.query(`NOTIFY chrysus, 'Hello from PostgreSQL NOTIFY!'`);
//client.query("NOTIFY chrysus, " + "'" + JSON.stringify(chrysusMessage) + "'");

// Log any notices
client.on("notice", async msg => {
  console.warn("notice:", msg);
});

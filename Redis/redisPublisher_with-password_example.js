const redis = require("redis"); // https://www.npmjs.com/package/redis

let client = redis.createClient({
  port: process.env.CHRYSUS_REDISPORT || 6379,
  host: process.env.CHRYSUS_REDISHOST || "127.0.0.1",
  password: process.env.CHRYSUS_REDISPASS
  // optional, if using SSL - use `fs.readFile[Sync]` or another method to bring these values in
  // tls: {
  //   key: stringValueOfKeyFile,
  //   cert: stringValueOfCertFile,
  //   ca: [stringValueOfCaCertFile]
  // }
});

const json = require("../Chrysus_Example_Messages/example_task_linux_ping.json"); // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
let chrysusMessage = JSON.stringify(json);
//console.log(chrysusMessage);

let channel = "incoming";
client.publish(channel, chrysusMessage);

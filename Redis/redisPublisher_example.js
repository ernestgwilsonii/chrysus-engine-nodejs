const client = require("redis").createClient();

const json = require("../Chrysus_Example_Messages/example_task_linux_ping.json"); // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
let chrysusMessage = JSON.stringify(json);
//console.log(chrysusMessage);

let channel = "incoming";
client.publish(channel, chrysusMessage);

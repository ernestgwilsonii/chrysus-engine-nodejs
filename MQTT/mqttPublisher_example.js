const mqtt = require("mqtt"); // https://www.npmjs.com/package/mqtt

let mqttTopic = "incoming";
let options = {
  protocolId: "MQTT",
  host: "127.0.0.1",
  port: "1883",
  topic: mqttTopic,
  rejectUnauthorized: false
};
let client = mqtt.connect(options);

const json = require("../Chrysus_Example_Messages/example_task_linux_ping.json"); // https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
let chrysusMessage = JSON.stringify(json);

client.on("connect", () => {
  client.subscribe(mqttTopic);
  // client.publish(mqttTopic, "Hello MQTT from Node.js");
  client.publish(mqttTopic, chrysusMessage);
  client.end();
});

// client.subscribe(mqttTopic);
// client.on("message", (mqttTopic, mqttMessage) => {
//   console.log(mqttTopic);
//   console.log(mqttMessage.toString());
//   client.end();
// });

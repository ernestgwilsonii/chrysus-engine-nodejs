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

// client.on("connect", () => {
//   client.subscribe(mqttTopic);
//   client.publish(mqttTopic, "Hello MQTT from Node.js");
//   client.end();
// });

client.subscribe(mqttTopic);
client.on("message", (mqttTopic, mqttMessage) => {
  console.log(mqttTopic);
  console.log(mqttMessage.toString());
  // client.end();
});

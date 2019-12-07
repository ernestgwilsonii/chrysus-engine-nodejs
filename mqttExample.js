// Example: Launching a Chrysus Engine using MQTT pub/sub
const { Chrysus } = require("./Chrysus");

// Choose a valid Chrysus type
let type = "mqtt";

// Define the required parameters based on the specific type
let params = {
  host: process.env.CHRYSUS_MQTT_HOST,
  port: process.env.CHRYSUS_MQTT_PORT,
  protocolId: process.env.CHRYSUS_MQTT_PROTOCOL_ID,
  topic: process.env.CHRYSUS_MQTT_TOPIC
};

// Create an instance of Chrysus
const chrysus = new Chrysus(type, params); //@ts-check

// Launch the Chrysus Engine
chrysus.engine();

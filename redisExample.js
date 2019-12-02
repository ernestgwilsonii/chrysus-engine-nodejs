// Example: Launching a Chrysus Engine using Redis pub/sub
const { Chrysus } = require("./Chrysus");

// Choose a valid Chrysus type
let type = "redis";

// Define the required parameters based on the specific type
// Redis without a password
// let params = {
//   redisHost: process.env.CHRYSUS_REDISHOST,
//   redisPort: process.env.CHRYSUS_REDISPORT,
//   redisChan: process.env.CHRYSUS_REDISCHAN
// };

// Or with a Redis password:
let params = {
  redisHost: process.env.CHRYSUS_REDISHOST,
  redisPort: process.env.CHRYSUS_REDISPORT,
  redisChan: process.env.CHRYSUS_REDISCHAN,
  redisPass: process.env.CHRYSUS_REDISPASS,
};

// Create an instance of Chrysus
const chrysus = new Chrysus(type, params); //@ts-check

// Launch the Chrysus Engine
chrysus.engine();

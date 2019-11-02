// Example: Launching a Chrysus Engine using Redis pub/sub
const { Chrysus } = require("./Chrysus");

let type = "redis";
let params = {
  redisHost: process.env.CHRYSUS_REDISHOST,
  redisPort: process.env.CHRYSUS_REDISPORT,
  redisPass: process.env.CHRYSUS_REDISPASS,
  redisChan: process.env.CHRYSUS_REDISCHAN
};

const chrysus = new Chrysus(type, params);
chrysus.engine();

// Example: Launching a Chrysus Engine using PostgreSQL Listener pub/sub subscriber
const { Chrysus } = require("./Chrysus");

// Choose a valid Chrysus type
let type = "postgres";

// Define the required parameters based on the specific type
let params = {
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  db: process.env.POSTGRESQL_DB,
  table: process.env.POSTGRESQL_TABLE,
};

// Create an instance of Chrysus
const chrysus = new Chrysus(type, params); //@ts-check

// Launch the Chrysus Engine
chrysus.engine();

const { Pool } = require("pg");
require("dotenv").config({ path: "../.env"});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD), // forzarlo a string porque me daba problemas
  port: process.env.DB_PORT,
});

module.exports = pool;


console.log("DB_USER:", process.env.DB_USER);

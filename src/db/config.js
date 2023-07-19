const dotenv = require('dotenv').config();

const config = {
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  schema : process.env.SCHEMA,
};

module.exports = config;

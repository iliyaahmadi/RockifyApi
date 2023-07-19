const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const Db = require("./db/database");
const dbConfig = require("./db/config");
const db = new Db(dbConfig);
const pool = db.getInstance();

console.log(pool)
//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

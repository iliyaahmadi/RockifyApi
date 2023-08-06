const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const db = require('./models/index');

db.sequelize.sync().then(() => {
  console.log('DB CONNECTED');
});

//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const db = require('./models/index');
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });
  Role.create({
    id: 2,
    name: 'premium',
  });

  Role.create({
    id: 3,
    name: 'artist',
  });
  Role.create({
    id: 4,
    name: 'admin',
  });
}

//middlewares
require('./middlewares/index')(app);
//router
require('./routes/index')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();

async function create(user) {
  try {
    await pool.query('insert into users(user_name,user_email) values($1,$2)', [
      user.name,
      user.email,
    ]);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  create,
};

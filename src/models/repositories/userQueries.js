const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();
const UserModel = require('../userModel');

async function create(user) {
  try {
    const userModel = new UserModel(user);
    await pool.query(
      'insert into users(id,user_name,user_email,user_password,user_image) values($1,$2,$3,$4,$5)',
      [...userModel.getUserInArr()]
    );
    return userModel;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  create,
};

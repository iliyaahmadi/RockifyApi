const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();
const UserModel = require('../userModel');

async function create(user) {
  try {
    const userModel = new UserModel(user);
    await pool.query(
      'insert into users(id,user_name,user_email,this.password,user_role_id,user_image) values($1,$2,$3,$4,$5)',
      [...userModel.getUserInArr()]
    );
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  create,
};

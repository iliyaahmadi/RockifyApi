const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();
const UserModel = require('../User');

async function findByEmail(email) {
  try {
    const user = await pool.query('select * from users where user_email=$1', [
      email,
    ]);
    if (user.rows[0]) {
      const newUser = {
        id: user.rows[0].id,
        name: user.rows[0].user_name,
        email: user.rows[0].user_email,
        password: user.rows[0].user_password,
        image: user.rows[0].user_image,
      };
      const userModel = new UserModel(newUser);
      return userModel.returnModel();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  findByEmail,
};

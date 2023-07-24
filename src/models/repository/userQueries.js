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

async function fetchAll() {
  const users = await pool.query('select * from users', []);
  console.log(users.rows);
  return users.rows;
}

async function fetchById(id) {
  const user = await pool.query('select * from users where id=$1', [id]);
  const newUser = {
    id: user.rows[0].id,
    name: user.rows[0].user_name,
    email: user.rows[0].user_email,
    password: user.rows[0].user_password,
    image: user.rows[0].user_image,
  };
  const userModel = new UserModel(newUser);
  return userModel;
}

module.exports = {
  create,
  fetchAll,
  fetchById,
};

const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();
const UserModel = require('../userModel');

async function fetchAll() {
  try {
    const users = await pool.query('select * from users', []);
    return users.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function create(user) {
  try {
    const userModel = new UserModel(user);
    await pool.query(
      'insert into users(id,user_name,user_email,user_password,user_image) values($1,$2,$3,$4,$5)',
      [...userModel.getUserInArr()]
    );
    return userModel.returnModel();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function fetchById(id) {
  try {
    const user = await pool.query('select * from users where id=$1', [id]);
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

async function edit(id, user) {
  try {
    const userModel = new UserModel(user);
    await pool.query(
      `UPDATE users SET "user_name"=$1,"user_password"=$2,"user_email"=$3,"user_image"=$4 WHERE "id"=$5`,
      [...userModel.getUserInfoInArr(), id]
    );
    return userModel.returnModel();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteById(id) {
  try {
    const user = fetchById(id);
    await pool.query('delete from users where id=$1', [id]);
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  create,
  fetchAll,
  fetchById,
  edit,
  deleteById,
};

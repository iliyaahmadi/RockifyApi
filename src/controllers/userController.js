const {
  create,
  fetchAll,
  fetchById,
} = require('../models/repositories/userQueries');
const hashPassword = require('../utils/hashPass');

const getAllUsers = async (req, res) => {
  const users = await fetchAll();
  console.log(users);
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  let id = req.params.id;
  const user = await fetchById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(200).json({ message: 'No user with that ID' });
  }
};

const createUser = async (req, res) => {
  let user = req.body;
  user.password = await hashPassword(user.password);
  const newUser = await create(user);
  res.status(201).json({ newUser });
};

const editUser = async (req, res) => {
  res.status(200).json({ message: `edit user ${req.params.id}` });
};

const deleteUser = async (req, res) => {
  res.status(200).json({ message: `delete user ${req.params.id}` });
};

module.exports = { getUser, createUser, editUser, deleteUser, getAllUsers };

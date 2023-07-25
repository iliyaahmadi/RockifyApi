const {
  create,
  fetchAll,
  fetchById,
  edit,
  deleteById,
} = require('../models/repository/userQueries');
const hashPassword = require('../utils/hashPass');

const getAllUsers = async (req, res) => {
  const users = await fetchAll();
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
  let id = req.params.id;
  let body = req.body;
  const targetUser = await fetchById(id);
  body.password = await hashPassword(body.password);
  let user = {
    name: body.name ?? targetUser.name,
    password: body.password ?? targetUser.password,
    email: body.email ?? targetUser.email,
    image: body.image ?? targetUser.image,
  };
  console.log(user);
  const editedUser = await edit(id, user);
  res.status(200).json({ message: `edited user`, editedUser });
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  const user = await deleteById(id);
  res.status(200).json({ message: `deleted user`, user });
};

module.exports = { getUser, createUser, editUser, deleteUser, getAllUsers };

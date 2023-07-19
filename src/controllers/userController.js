const { create } = require('../models/repositories/userQueries');

const getAllUsers = (req, res) => {
  res.status(200).json({ message: 'get all users' });
};

const getUser = (req, res) => {
  res.status(200).json({ message: `get user ${req.params.id}` });
};

const createUser = (req, res) => {
  const user = req.body;
  create(user);
  res.status(201).json({ message: `created` });
};

const editUser = (req, res) => {
  res.status(200).json({ message: `edit user ${req.params.id}` });
};

const deleteUser = (req, res) => {
  res.status(200).json({ message: `delete user ${req.params.id}` });
};

module.exports = { getUser, createUser, editUser, deleteUser, getAllUsers };
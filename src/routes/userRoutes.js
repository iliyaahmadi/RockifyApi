const userRoutes = require('express').Router();
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
} = require('../controllers/userController');


userRoutes.route('/user')
  .get(getAllUsers)
  .post(createUser);

userRoutes.route('/user/:id')
  .get(getUser)
  .put(editUser)
  .delete(deleteUser);

module.exports = userRoutes;

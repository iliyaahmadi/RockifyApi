const userRoutes = require('express').Router();
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
} = require('../controllers/userController');


userRoutes.route('/user')
  .get(getAllUsers)
  .post(createUser);

userRoutes.route('/user/:id')
  .get(getUser)
  .put(editUser)
  .delete(deleteUser);

userRoutes.route('/user/role/:id')
  .post(updateUserRole)

module.exports = userRoutes;

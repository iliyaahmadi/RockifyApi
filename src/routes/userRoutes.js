const userRoutes = require('express').Router();
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
} = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

userRoutes
  .route('/user')
  .get(userAuth, getAllUsers)
  .post(adminAuth, createUser);

userRoutes
  .route('/user/:id')
  .get(userAuth, getUser)
  .put(userAuth, editUser)
  .delete(adminAuth, deleteUser);

userRoutes.route('/user/role/:id').post(adminAuth, updateUserRole);

module.exports = userRoutes;

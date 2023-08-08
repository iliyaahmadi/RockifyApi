const userRoutes = require('express').Router();
const {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
  uploadProfile,
  getProfile,
} = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');
const uploadImage = require('../utils/uploadImg');

userRoutes.route('/user/profile').get(userAuth, getProfile);

userRoutes
  .route('/user')
  .get(userAuth, getAllUsers)
  .post(adminAuth, createUser);

userRoutes
  .route('/user/:id')
  .get(userAuth, getUser)
  .put(userAuth, editUser)
  .delete(adminAuth, deleteUser);

userRoutes.route('/user/:id/role').patch(adminAuth, updateUserRole);

userRoutes.route('/user/uploadProfile').patch(userAuth, uploadImage, uploadProfile);

module.exports = userRoutes;

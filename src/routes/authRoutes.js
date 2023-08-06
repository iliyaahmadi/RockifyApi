const authRoutes = require('express').Router();
const { login, signup, logout } = require('../controllers/authController');
const userAuth = require('../middlewares/userAuth');

authRoutes.route('/login').get(login);

authRoutes.route('/signup').post(signup);

authRoutes.route('/logout').get(userAuth, logout);

module.exports = authRoutes;

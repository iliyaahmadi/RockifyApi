const authRoutes = require('express').Router();
const {
  login,
  signup,
} = require('../controllers/authController');

authRoutes.route('/login')
  .post(login)

authRoutes.route('/signup')
  .post(signup)
  
module.exports = authRoutes;

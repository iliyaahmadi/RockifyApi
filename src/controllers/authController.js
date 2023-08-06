const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../utils/hashPass');
const db = require('../models');
const User = db.user;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let user, validPass;
  if (email && password) {
    user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    validPass = await bcrypt.compare(password, user.password);
  } else {
    res.status(400).json({ message: `please enter email and password` });
  }
  if (user === null || !validPass) {
    return res.status(401).json({
      accessToken: null,
      message: 'Email or password is incorrect',
    });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.setHeader('Set-Cookie', `access-token=${accessToken}`);
  res.status(200).json({ accessToken });
};

const signup = async (req, res) => {
  const exists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exists) {
    res.status(400).json({ message: 'a user with this email already exists' });
  } else {
    const hashedPass = await hashPassword(req.body.password);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      image: null,
      role_id: req.body.role ? req.body.role : 1,
    });
    res.status(201).json({ message: 'Registered successfully' });
  }
};

module.exports = {
  login,
  signup,
};

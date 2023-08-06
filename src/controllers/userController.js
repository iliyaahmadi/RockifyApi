const db = require('../models');
const User = db.user;
const hashPassword = require('../utils/hashPass');

const getAllUsers = async (req, res) => {
  console.log(req.userId);
  console.log(req.userRole);
  const users = await User.findAll({
    attributes: ['username', 'email', 'createdAt', 'image'],
  });
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const createUser = async (req, res) => {
  const hashedPass = await hashPassword(req.body.password);
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
    image: null,
    role_id: req.body.role ? req.body.role : 1,
  });
  res.status(201).json({
    message: `user ${user.username} succesfully with id of ${user.id}`,
  });
};

const editUser = async (req, res) => {
  const target = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  let hashedPass;
  if (req.body.password) {
    hashedPass = await hashPassword(req.body.password);
  }
  await User.update(
    {
      username: req.body.username ?? target.username,
      email: req.body.email ?? target.email,
      password: hashedPass ?? target.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({
    message: `edited user`,
    user: {
      username: target.username,
      email: target.email,
    },
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).json({ message: `deleted user with id of ${id}` });
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const updateUserRole = async (req, res) => {
  let id = req.params.id;
  let roleId = req.body.role;
  if (roleId === 'user') {
    roleId = 1;
  } else if (roleId === 'premium') {
    roleId = 2;
  } else if (roleId === 'artist') {
    roleId = 3;
  } else if (roleId === 'admin') {
    roleId = 4;
  } else {
    res.status(400).json({ message: `Invalid Role`, roleId });
  }
  User.update(
    { role_id: roleId },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.status(200).json({ message: `Role Updated` });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

module.exports = {
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
};

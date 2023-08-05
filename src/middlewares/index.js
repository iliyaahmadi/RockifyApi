const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5000',
};
module.exports = function (app) {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

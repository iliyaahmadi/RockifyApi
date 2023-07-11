const express = require('express');
const errorHandler = require('./errorHandler');

module.exports = function (app) {
  app.use(express.json());
  app.use(errorHandler);
};

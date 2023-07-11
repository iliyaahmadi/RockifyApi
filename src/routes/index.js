const userRoutes = require('./userRoutes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
};

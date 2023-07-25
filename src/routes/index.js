const userRoutes = require('./userRoutes.js');
const trackRoutes = require('./trackRoutes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', trackRoutes);
};

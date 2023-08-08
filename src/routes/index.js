const userRoutes = require('./userRoutes.js');
const trackRoutes = require('./trackRoutes.js');
const authRoutes = require('./authRoutes.js');
const playlistRoutes = require('./playlistRoutes.js');

module.exports = function (app) {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', trackRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', authRoutes);
  app.use('/api/v1', playlistRoutes);
};

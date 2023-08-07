const trackRoutes = require('express').Router();
const {
  getAllTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
  likeTrack,
} = require('../controllers/trackController');
const userAuth = require('../middlewares/userAuth');
const artistAuth = require('../middlewares/adminAuth');
const adminAuth = require('../middlewares/adminAuth');

trackRoutes
  .route('/track')
  .get(userAuth, getAllTracks)
  .post(artistAuth, createTrack);

trackRoutes
  .route('/track/:id')
  .get(userAuth, getTrack)
  .put(artistAuth, editTrack)
  .delete(adminAuth, deleteTrack);

trackRoutes.route('/track/:id/like').post(userAuth, likeTrack);

module.exports = trackRoutes;

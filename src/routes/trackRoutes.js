const trackRoutes = require('express').Router();
const {
  getAllTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
  likeTrack,
  getTrackAudio,
} = require('../controllers/trackController');
const userAuth = require('../middlewares/userAuth');
const artistAuth = require('../middlewares/adminAuth');
const adminAuth = require('../middlewares/adminAuth');
const uploadAudio = require('../utils/uploadAudio');

trackRoutes
  .route('/track')
  .get(userAuth, getAllTracks)
  .post(artistAuth, uploadAudio, createTrack);

trackRoutes
  .route('/track/:id')
  .get(userAuth, getTrack)
  .put(artistAuth, editTrack)
  .delete(adminAuth, deleteTrack);

trackRoutes.route('/track/:id/audio').get(getTrackAudio);

trackRoutes.route('/track/:id/like').post(userAuth, likeTrack);

module.exports = trackRoutes;

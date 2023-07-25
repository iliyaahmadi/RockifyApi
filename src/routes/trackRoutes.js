const trackRoutes = require('express').Router();
const {
  getAllTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
  likeTrack,
} = require('../controllers/trackController');


trackRoutes.route('/track')
  .get(getAllTracks)
  .post(createTrack);

trackRoutes.route('/track/:id')
  .get(getTrack)
  .put(editTrack)
  .delete(deleteTrack);

trackRoutes.route('/track/like/:id')
  .post(likeTrack)

module.exports = trackRoutes;

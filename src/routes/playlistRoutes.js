const playlistRoutes = require('express').Router();
const {
  getUserPlaylists,
  createPlaylist,
  getPlaylist,
  editPlaylist,
  deletePlaylist,
  getAllUsersPlaylists,
  getPlaylistTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} = require('../controllers/playlistController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');

playlistRoutes
  .route('/playlist')
  .get(userAuth, getUserPlaylists)
  .post(userAuth, createPlaylist);

playlistRoutes.route('/playlist/all').get(adminAuth, getAllUsersPlaylists);

playlistRoutes
  .route('/playlist/:id')
  .get(getPlaylist)
  .patch(userAuth, editPlaylist)
  .delete(userAuth, deletePlaylist);

playlistRoutes.route('/playlist/:id/tracks').get(getPlaylistTracks);

playlistRoutes.route('/playlist/:id/add/:track').post(addTrackToPlaylist);

playlistRoutes.route('/playlist/:id/remove/:track').delete(removeTrackFromPlaylist);

module.exports = playlistRoutes;

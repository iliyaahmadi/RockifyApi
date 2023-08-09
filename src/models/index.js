const config = require('../configs/database');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize').DataTypes;

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User.js')(sequelize, DataTypes);
db.track = require('./Track.js')(sequelize, DataTypes);
db.role = require('./Role.js')(sequelize, DataTypes);
db.playlist = require('./Playlist.js')(sequelize, DataTypes);

db.role.hasMany(db.user, {
  foreignKey: 'role_id',
  defaultValue: 1,
});

db.user.hasMany(db.playlist, {
  foreignKey: 'user_id',
});

//user's liked tracks table
const Likes = sequelize.define('likes');
db.likes = Likes;

db.track.belongsToMany(db.user, {
  through: 'likes',
});
db.user.belongsToMany(db.track, {
  through: 'likes',
});

//tracks of a user's playlsit table
const PlaylistTracks = sequelize.define('playlist_tracks');
db.playlist_tracks = PlaylistTracks;

db.track.belongsToMany(db.playlist, {
  through: 'playlist_tracks',
});
db.playlist.belongsToMany(db.track, {
  through: 'playlist_tracks',
});

//history of user's listened tracks table
const History = sequelize.define('history');
db.history = History;

db.user.belongsToMany(db.track, {
  through: 'history',
});
db.track.belongsToMany(db.user, {
  through: 'history',
});

module.exports = db;

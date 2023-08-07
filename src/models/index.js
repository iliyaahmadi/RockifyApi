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

db.role.hasMany(db.user, {
  foreignKey: 'role_id',
  defaultValue: 1,
});

const Likes = sequelize.define('likes');
db.likes = Likes;

db.track.belongsToMany(db.user, {
  through: 'likes',
});
db.user.belongsToMany(db.track, {
  through: 'likes',
});

module.exports = db;

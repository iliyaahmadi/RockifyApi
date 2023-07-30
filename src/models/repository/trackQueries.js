const Db = require('../../db/database');
const dbConfig = require('../../db/config');
const db = new Db(dbConfig);
const pool = db.getInstance();
const TrackModel = require('../Track');

async function fetchAll() {
  try {
    const tracks = await pool.query('select * from tracks', []);
    return tracks.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function create(track) {
  try {
    const trackModel = new TrackModel(track);
    await pool.query(
      'insert into tracks(id,track_title,track_likes,track_duration,track_path,track_cover) values($1,$2,$3,$4,$5,$6)',
      [...trackModel.createTrackInArr()]
    );
    return trackModel.returnModel();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function fetchById(id) {
  try {
    const track = await pool.query('select * from tracks where id=$1', [id]);
    if (track.rows[0]) {
      const newTrack = {
        id: track.rows[0].id,
        title: track.rows[0].track_title,
        duration: track.rows[0].track_duration,
        path: track.rows[0].track_path,
        cover: track.rows[0].track_cover,
        artist: track.rows[0].track_artist,
        album: track.rows[0].track_album,
      };
      const trackModel = new TrackModel(newTrack);
      return trackModel.returnModel();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function edit(id, track) {
  try {
    const trackModel = new TrackModel(track);
    await pool.query(
      `UPDATE tracks SET "track_title"=$1,"track_likes"=$2,"track_duration"=$3,
      "track_path"=$4,"track_cover"=$5 WHERE "id"=$6`,
      [...trackModel.EditTrackInArr(), id]
    );
    return trackModel.returnModel();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteById(id) {
  try {
    const track = fetchById(id);
    await pool.query('delete from tracks where id=$1', [id]);
    return track;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function like(id) {
  try {
    const trackLikes = await pool.query(
      `SELECT track_likes FROM tracks WHERE id=$1`,
      [id]
    );
    let likes = parseInt(trackLikes.rows[0].track_likes);
    const newLike = (likes += 1);
    await pool.query(`UPDATE tracks SET "track_likes"=$1 WHERE id=$2`, [
      newLike,
      id,
    ]);
    return newLike;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  create,
  fetchAll,
  fetchById,
  edit,
  deleteById,
  like,
};

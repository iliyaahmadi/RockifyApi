const db = require('../models');
const Track = db.track;
const Likes = db.likes;

const getAllTracks = async (req, res) => {
  const tracks = await Track.findAll({
    attributes: ['id', 'title', 'genre', 'artist', 'createdAt', 'cover'],
  });
  res.status(200).json(tracks);
};

const getTrack = async (req, res) => {
  Track.findOne(
    {
      attributes: ['id', 'title', 'genre', 'artist', 'createdAt', 'cover'],
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((track) => {
      res.status(200).json(track);
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const createTrack = async (req, res) => {
  console.log(req.file);
  const track = await Track.create({
    title: req.body.title,
    filename: req.file.path,
    cover: null,
    genre: req.body.genre,
    artist: req.body.artist,
  });
  res.status(201).json({
    message: `${track.title} succesfully created with id of ${track.id}`,
  });
};

const editTrack = async (req, res) => {
  const target = await Track.findOne({
    where: {
      id: req.params.id,
    },
  });
  await Track.update(
    {
      title: req.body.title ?? target.title,
      filename: req.body.email ?? target.filename,
      genre: req.body.genre ?? target.genre,
      artist: req.body.artist ?? target.artist,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({
    message: `track edited`,
    track: {
      title: target.title,
      filename: target.filename,
      genre: target.genre,
      artist: target.artist,
    },
  });
};

const deleteTrack = async (req, res) => {
  const id = req.params.id;
  Track.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).json({ message: `deleted track with id of ${id}` });
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const likeTrack = async (req, res) => {
  let trackId = req.params.id;
  let userId = req.userId;
  const exists = await Likes.findOne({
    where: {
      userId: userId,
      trackId: trackId,
    },
  });
  if (exists) {
    await Likes.destroy({
      where: {
        userId: userId,
        trackId: trackId,
      },
    });
    return res.status(200).json({ message: `track removed from likes` });
  } else {
    await Likes.create({
      userId: userId,
      trackId: trackId,
    });
    return res.status(200).json({ message: `track liked` });
  }
};

const getLikedTracks = async (req, res) => {
  await db.likes.findAll(
    { attributes: ['trackId'] },
    {
      where: {
        userId: req.userId,
      },
    }
  ).then((r) => {
    res.status(200).json(r);
  });
};

const getTrackAudio = async (req, res) => {
  const track = await Track.findOne({
    where: {
      id: req.params.id,
    },
  });
  const file = track.filename;
  let path = __basedir.replace(/\\src/, '//');
  return res.sendFile(path + file);
};

const uploadTrackCover = async (req, res) => {
  await Track.update(
    {
      cover: req.file.path,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.sendStatus(200);
};

module.exports = {
  getAllTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
  likeTrack,
  getTrackAudio,
  getLikedTracks,
  uploadTrackCover,
};

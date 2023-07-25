const {
  create,
  fetchAll,
  fetchById,
  edit,
  deleteById,
  like,
} = require('../models/repository/trackQueries');

const getAllTracks = async (req, res) => {
  const tracks = await fetchAll();
  res.status(200).json(tracks);
};

const getTrack = async (req, res) => {
  let id = req.params.id;
  const track = await fetchById(id);
  if (track) {
    res.status(200).json(track);
  } else {
    res.status(200).json({ message: 'No track with that ID' });
  }
};

const createTrack = async (req, res) => {
  let track = req.body;
  const newTrack = await create(track);
  res.status(201).json({ newTrack });
};

const editTrack = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  const targetTrack = await fetchById(id);
  let track = {
    title: body.title ?? targetTrack.title,
    duration: body.duration ?? targetTrack.duration,
    path: body.path ?? targetTrack.path,
    cover: body.cover ?? targetTrack.cover,
    artist: targetTrack.artist,
    album: targetTrack.album,
  };
  const editedTrack = await edit(id, track);
  res.status(200).json({ message: `Track has been Edited`, editedTrack });
};

const deleteTrack = async (req, res) => {
  let id = req.params.id;
  const track = await deleteById(id);
  res.status(200).json({ message: `deleted track`, track });
};

const likeTrack = async (req, res) => {
  let id = req.params.id;
  const newLike = await like(id);
  res.status(200).json({ message: `track liked`, likes: newLike });
};

module.exports = {
  getAllTracks,
  getTrack,
  createTrack,
  editTrack,
  deleteTrack,
  likeTrack,
};

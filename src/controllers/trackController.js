const db = require('../models');
const Track = db.track;

const getAllTracks = async (req, res) => {
  const tracks = await Track.findAll();
  res.status(200).json(tracks);
};

const getTrack = async (req, res) => {
  Track.findOne({
    where: {
      id: req.params.id,
    },
  })
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
  const track = await Track.create({
    title: req.body.username,
    email: req.body.email,
    password: hashedPass,
    image: null,
    role_id: req.body.role ? req.body.role : 1,
  });
  res.status(201).json({
    message: `${track.title} succesfully created with id of ${track.id}`,
  });
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

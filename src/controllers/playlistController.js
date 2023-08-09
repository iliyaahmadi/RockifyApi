const db = require('../models');
const Playlist = db.playlist;
const Playlist_Tracks = db.playlist_tracks;

const getUserPlaylists = async (req, res) => {
  await Playlist.findAll(
    { attributes: ['id', 'name', 'createdAt'] },
    {
      where: {
        user_id: req.userId,
      },
    }
  )
    .then((playlists) => {
      res.status(200).json(playlists);
    })
    .catch((err) => {
      res.status(400).json({ message: 'no playlist found' });
    });
};

const getPlaylist = async (req, res) => {
  await Playlist.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((playlist) => {
      res.status(200).json(playlist);
      return;
    })
    .catch((err) => {
      res.status(400).json({ message: err });
      console.log(err);
      return;
    });
};

const createPlaylist = async (req, res) => {
  await Playlist.create({
    name: req.body.name,
    cover: null,
    user_id: req.userId,
  })
    .then((playlist) => {
      res.status(201).json({
        message: `${playlist.name} succesfully created with id of ${playlist.id}`,
        owner: req.userId,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error while creating playlist',
      });
      console.log(err);
    });
};

const editPlaylist = async (req, res) => {
  const target = await Playlist.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (target.user_id == req.userId) {
    await Playlist.update(
      {
        name: req.body.name ?? target.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: `playlist edited`,
      playlist: {
        name: target.name,
      },
    });
  } else {
    res.status(401).json({
      message: `this playlist is not yours to edit`,
      playlist: {
        name: target.name,
      },
    });
  }
};

const deletePlaylist = async (req, res) => {
  const target = await Playlist.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (target.user_id == req.userId) {
    await Playlist.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res
          .status(200)
          .json({ message: `deleted playlist with id of ${req.params.id}` });
        return;
      })
      .catch((err) => {
        res.status(400).json({ message: err });
        console.log(err);
        return;
      });
  } else {
    res.status(401).json({
      message: `this playlist is not yours to delete`,
      playlist: {
        name: target.name,
      },
    });
  }
};

const getAllUsersPlaylists = async (req, res) => {
  await Playlist.findAll()
    .then((playlists) => {
      return res.status(200).json(playlists);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: 'no playlist found', err });
    });
};

const getPlaylistTracks = async (req, res) => {
  await Playlist_Tracks.findAll(
    { attributes: ['trackId'] },
    {
      where: {
        playlistId: req.params.id,
      },
    }
  ).then((r) => {
    res.status(200).json(r);
  });
};

const addTrackToPlaylist = async (req, res) => {
  const pId = req.params.id;
  const tId = req.params.track;
  const exists = await Playlist_Tracks.findOne({
    where: {
      trackId: tId,
      playlistId: pId,
    },
  });
  if (!exists) {
    await Playlist_Tracks.create({
      trackId: tId,
      playlistId: pId,
    })
      .then(() => {
        return res.status(200).json({ message: 'track added to playlsit' });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ message: 'error in adding track to playlsit' });
      });
  } else {
    return res
      .status(200)
      .json({ message: 'this track is already in your playlsit' });
  }
};

const removeTrackFromPlaylist = async (req, res) => {
  await Playlist_Tracks.destroy({
    where: {
      trackId: tId,
      playlistId: pId,
    },
  })
    .then(() => {
      return res.status(200).json({ message: `track removed from likes` });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(200)
        .json({ message: 'error in deleting track from playlsit' });
    });
};

module.exports = {
  getUserPlaylists,
  createPlaylist,
  getPlaylist,
  editPlaylist,
  deletePlaylist,
  getAllUsersPlaylists,
  getPlaylistTracks,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
};

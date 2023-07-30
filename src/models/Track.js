const crypto = require('crypto');

class Track {
  constructor(track) {
    this.id = crypto.randomUUID();
    this.track_title = track.title;
    this.track_likes = 0;
    this.track_duration = track.duration;
    this.track_path = track.path;
    this.track_cover = track.cover;
    this.track_artist = track?.artist ?? 'null';
    this.track_album = track?.cover ?? 'null';
  }
  getTrackInArr() {
    return [
      this.id,
      this.track_title,
      this.track_likes,
      this.track_duration,
      this.track_path,
      this.track_cover,
      this.track_artist,
      this.track_album,
    ];
  }
  createTrackInArr() {
    return [
      this.id,
      this.track_title,
      this.track_likes,
      this.track_duration,
      this.track_path,
      this.track_cover,
    ];
  }
  EditTrackInArr() {
    return [
      this.track_title,
      this.track_likes,
      this.track_duration,
      this.track_path,
      this.track_cover,
    ];
  }
  returnModel() {
    return {
      id: this.id,
      title: this.track_title,
      duration: this.track_duration,
      path: this.track_path,
      cover: this.track_cover,
      artist: this.track_artist,
      album: this.track_album,
    };
  }
}

module.exports = Track;

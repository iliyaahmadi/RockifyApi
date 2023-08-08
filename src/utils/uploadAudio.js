const path = require('path');
const multer = require('multer');

//multer store file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/audios');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.mp3');
  },
});

const uploadAudio = multer({
  storage: storage,
  limits: { fileSize: '10000000' },
  //validating file format and ext
  // fileFilter: (req, file, cb) => {
  //   const fileTypes = 'mp3';
  //   const mimeType = fileTypes.test(file.mimetype);
  //   const extname = fileTypes.test(path.extname(file.originalname));
  //   if (mimeType && extname) {
  //     return cb(null, true);
  //   }
  //   cb('Please upload a file with proper format of mp3 / wav / ogg');
  // },
}).single('audio');

module.exports = uploadAudio;

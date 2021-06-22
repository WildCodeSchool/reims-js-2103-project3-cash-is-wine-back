const uploadRoute = require('express').Router();

const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

// define the index route
uploadRoute.post('/', upload.single('File'), (req, res) => {
  console.log(req.file);
  if (req.file.size <= 100000) {
    fs.renameSync(req.file.path, `uploads/${req.file.originalname}`);
  } else {
    fs.rmdirSync(req.file.path);
  }
  res.send('Hello dear API client :)');
});

module.exports = uploadRoute;

const uploadRoute = require('express').Router();

const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

// define the index route
uploadRoute.post('/', upload.fields([{ name: 'bottleFront' }, { name: 'bottleBack' }]), (req, res) => {
  const front = req.files.bottleFront[0];
  console.log(front);

  const back = req.files.bottleBack[0];
  console.log(back);

  let stringFront = 'L\'image recto a bien été importée';
  let stringBack = 'L\'image verso a bien été importée.';

  if (front.size <= 100000) {
    fs.renameSync(front.path, `uploads/${front.originalname}`);
  } else {
    fs.rmSync(front.path);
    stringFront = 'L\'image recto est trop volumineuse';
  }
  if (back.size <= 100000) {
    fs.renameSync(back.path, `uploads/${back.originalname}`);
  } else {
    fs.rmSync(back.path);
    stringBack = 'L\'image verso est trop volumineuse.';
  }
  res.send(`${stringFront}. ${stringBack}`);
});

module.exports = uploadRoute;

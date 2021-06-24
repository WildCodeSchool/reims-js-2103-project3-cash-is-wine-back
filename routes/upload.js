const uploadRoute = require('express').Router();

const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

// define the index route
uploadRoute.post('/', upload.fields([{ name: 'bottleFront' }, { name: 'bottleBack' }]), (req, res) => {
  // console.log('hello');
  // const front = req.files.bottleFront[0];
  // const back = req.files.bottleBack[0];
  // console.log(req.files.bottleFront);
  // console.log(req.files.bottleBack);
  // console.log(bottleFront[0]);
  // if (front.size <= 100000) {
  //   fs.renameSync(front.path, `uploads/${front.originalname}`);
  // } else {
  //   fs.rmSync(front.path);
  // }
  // if (back.size <= 100000) {
  //   fs.renameSync(back.path, `uploads/${back.originalname}`);
  // } else {
  //   fs.rmSync(back.path);
  // }

  if (req.files.bottleFront[0].size <= 100000 && req.files.bottleBack[0].size <= 100000) {
    fs.renameSync(req.files.bottleFront[0].path, `uploads/${req.files.bottleFront[0].originalname}`);
    fs.renameSync(req.files.bottleBack[0].path, `uploads/${req.files.bottleBack[0].originalname}`);
    res.status(200).json({
      imageFront: req.files.bottleFront[0],
      imageBack: req.files.bottleBack[0],
    });
  } else if (req.files.bottleFront[0].size > 100000 && req.files.bottleBack[0].size <= 100000) {
    fs.rmSync(req.files.bottleFront[0].path);
    fs.renameSync(req.files.bottleBack[0].path, `uploads/${req.files.bottleBack[0].originalname}`);
    res.json({ error: 'Image recto trop volumineuse! Image verso bien uploadée!' });
  } else if (req.files.bottleBack[0].size > 100000 && req.files.bottleFront[0].size <= 100000) {
    fs.rmSync(req.files.bottleBack[0].path);
    fs.renameSync(req.files.bottleFront[0].path, `uploads/${req.files.bottleFront[0].originalname}`);
    res.json({ error: 'Image verso trop volumineuse! Image recto bien uploadée !' });
  } else {
    fs.rmSync(req.files.bottleFront[0].path);
    fs.rmSync(req.files.bottleBack[0].path);
    res.json({ error: 'Les deux images sont trop volumineuses !!' });
  }
});

module.exports = uploadRoute;

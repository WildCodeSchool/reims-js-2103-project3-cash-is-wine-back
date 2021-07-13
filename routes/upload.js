const uploadRoute = require('express').Router();

const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const fs = require('fs');

// define the index route
uploadRoute.post('/', upload.fields([{ name: 'bottleFront' }, { name: 'bottleBack' }]), (req, res) => {
  if (req.files.bottleFront[0].size <= 10000000 && req.files.bottleBack[0].size <= 10000000) {
    fs.renameSync(req.files.bottleFront[0].path, `uploads/${req.files.bottleFront[0].originalname}`);
    fs.renameSync(req.files.bottleBack[0].path, `uploads/${req.files.bottleBack[0].originalname}`);
    res.status(200).json({
      imageFront: req.files.bottleFront[0],
      imageBack: req.files.bottleBack[0],
    });
  } else if (req.files.bottleFront[0].size > 10000000 && req.files.bottleBack[0].size <= 10000000) {
    fs.rmSync(req.files.bottleFront[0].path);
    fs.renameSync(req.files.bottleBack[0].path, `uploads/${req.files.bottleBack[0].originalname}`);
    res.json({ error: 'Image recto trop volumineuse! Image verso bien uploadée!', imageBack: req.files.bottleBack[0] });
  } else if (req.files.bottleBack[0].size > 10000000 && req.files.bottleFront[0].size <= 10000000) {
    fs.rmSync(req.files.bottleBack[0].path);
    fs.renameSync(req.files.bottleFront[0].path, `uploads/${req.files.bottleFront[0].originalname}`);
    res.json({ error: 'Image verso trop volumineuse! Image recto bien uploadée !', imageFront: req.files.bottleFront[0] });
  } else {
    fs.rmSync(req.files.bottleFront[0].path);
    fs.rmSync(req.files.bottleBack[0].path);
    res.json({ error: 'Les deux images sont trop volumineuses !!' });
  }
});

module.exports = uploadRoute;

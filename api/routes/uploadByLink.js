const express = require('express');
const router = express.Router();
const path = require('path');
const imageDownlaoder = require('image-downloader');

router.post("/",async(req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  const options = {
    url:link,
    dest:path.join(__dirname,"..","uploads",newName)
  }

  await imageDownlaoder.image(options);
  res.json(newName);
})

module.exports = router;

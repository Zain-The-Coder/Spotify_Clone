const express = require('express');
const musicController = require('../controllers/music.controller.js')
const musicRouter = express.Router();
const multer = require('multer');

const upload = multer({
    storage : multer.memoryStorage()
});

musicRouter.post("/upload-music" , upload.single('music') , musicController.createMusic);
musicRouter.post("/create-album" , musicController.createAlbum);

module.exports = musicRouter;
const express = require('express');
const musicController = require('../controllers/music.controller.js')
const musicRouter = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware.js')
const multer = require('multer');

const upload = multer({
    storage : multer.memoryStorage()
});

musicRouter.post("/upload-music" , authMiddleWare.authArtist , upload.single('music') , musicController.createMusic);
musicRouter.post("/create-album" , authMiddleWare.authArtist , musicController.createAlbum);
musicRouter.get("/" , authMiddleWare.authUser , musicController.getMusics);
musicRouter.get("/albums" , musicController.getAlbums);
musicRouter.get("/albums/:albumId" , authMiddleWare.authenticate , musicController.getAlbumById);

module.exports = musicRouter;
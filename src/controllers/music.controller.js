const express = require('express');
const musicModel = require('../models/music.model.js');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service.js');
const albumModel = require('../models/album.model.js');
const { default: chalk } = require('chalk');


async function createMusic (req , res) {
    try {
    const { title } = req.body ;
    const file = req.file ;
    
    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri : result.url ,
        title , 
        artist :  req.user.id
    });

    res.status(201).json({
        status : 201 , 
        message : 'Music Created Successfully !' , 
        music_Details : {
            id : music._id , 
            uri : music.uri ,
            title : music.title ,
            artist : music.artist 
        }
    })
    } catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : e.message
        });
    }

};

async function createAlbum ( req , res) {
    try {
    const {title , musicIds} = req.body ;

    const album = await albumModel.create({
        title : title ,
        album : musicIds ,
        artist : req.user.id
    });

    res.status(201).json({
        status : 201 , 
        message : 'Album Created Successfully !' ,
        album_Details : {
            album : album
        }
    });
} catch (e) {
    return res.status(500).json({
        status : 500 , 
        error_Message : e.message
    })
}
}

async function getMusics (req , res) {
    try {
    const musics = await musicModel.find().populate("artist" , "username email");

    res.status(200).json({
        status : 200 , 
        message : "Musics Fetched Successfully !" , 
        musics : musics 
    })
    } catch(e) {
        res.status(500).json({
            status : 500 ,
            error_Message : e.message
        })
    }
}

async function getAlbums (req , res) {
    try {
    const albums = await albumModel.find().populate("artist" , "username email");

    res.status(200).json({
        status : 200 , 
        message : "Albums Fetched Successfully !" , 
        albums : albums
    })
    } catch (e) {
        res.status(500).json({
            status : 500 ,
            error_Message : e.message
        })
    }
}

async function getAlbumById (req , res) {
    try {
        const albumId = req.params.albumId ;
        const album = await albumModel.findById(albumId).populate("artist" , "username email").populate("album");

        res.status(200).json({
            status : 200 , 
            message : "Album Fetched Successfully !" ,
            album : album
        })
    } catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : e.message 
        })
    }
}

module.exports = { createMusic , createAlbum , getMusics  , getAlbums , getAlbumById};
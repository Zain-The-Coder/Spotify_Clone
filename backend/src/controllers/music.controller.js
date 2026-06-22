const express = require('express');
const musicModel = require('../models/music.model.js');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service.js');
const albumModel = require('../models/album.model.js');
const { default: chalk } = require('chalk');

async function createMusic (req , res) {
    try {

    const token = req.cookies.token ;

    if(!token) {
        return res.status(401).json({
            status : 401 , 
            error_Message : "Unauthorized !"
        })
    };

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(decoded.role !== "artist") {
            return res.status(403).json({
                status : 403 , 
                error_Message : "You are not access to create a music"
            })
        };

    const { title } = req.body ;
    const file = req.file ;
    
    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri : result.url ,
        title , 
        artist :  decoded.id
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
        })
    }

};

async function createAlbum ( req , res) {
    try {
    const token = req.cookies.token ;

    if(!token) {
        return res.status(401).json({
            status : 401 , 
            error_Message : "Unauthorized !"
        })
    };

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    if(decoded.role !== "artist") {
        return res.status(401).json({
            status : 401 , 
            error_Message : 'You are not access to create an album'
        })
    };

    const {title , musicIds} = req.body ;

    const album = await albumModel.create({
        title : title ,
        album : musicIds ,
        artist : decoded.id
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

module.exports = { createMusic , createAlbum };
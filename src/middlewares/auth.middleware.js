const express = require('express');
const jwt = require('jsonwebtoken');

async function authArtist ( req , res , next ) {
    try {
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
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

        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : e.message
        })
    }
};

async function authUser (req , res , next) {
    try {
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({
            status : 401 , 
            error_Message : "Unauthorized !"
        })
    };  
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(decoded.role !== "artist" && decoded.role !== "user") {
            return res.status(403).json({
                status : 403 , 
                error_Message : "You are not access to create a music"
            })
        };    

        req.user = decoded;
        next();

        
    }catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : e.message
        })
    }
}

async function authenticate (req , res , next) {
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(403).json({
            status : 403 , 
            error : "Unauthorized !"
        })
    };

    next()
}

module.exports = { authArtist , authUser , authenticate} ;
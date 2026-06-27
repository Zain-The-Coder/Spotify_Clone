const userModel = require('../models/user.model.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser (req , res) {
    try {
        const {username , email , password , role = "user"} = req.body ;
        
        const isAlreadyExist = await userModel.findOne({
            $or : [
                {username} , 
                {email}
            ]
        });
        
        if(isAlreadyExist) {
            return res.status(500).json({
                status : 500 , 
                error_Message : 'Username or email is already taken !'
            })
        };

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await userModel.create({
            username ,
            email , 
            password : hashedPassword ,
            role
        });

        const token = jwt.sign({
            id : user._id ,
            role : user.role
        } , process.env.JWT_SECRET , {
            expiresIn : "7d"
        });

        res.cookie("token" , token); 
        res.status(201).json({
            status : 201 , 
            message : "User Created Successfully !" , 
            user : user
        })

    } catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : "User Not Created" ,
            reason : e.message
        })
    }
}
 
async function loginUser (req , res) {
    try {
        const {username , email , password} = req.body ;
        
        const user = await userModel.findOne({
            $or : [
                {username} , 
                {email}
            ]
        });
        
        if(!user) {
            return res.status(401).json({
                status : 401  , 
                message : "Invalid Credentials !"
            })
        };

        const passwordValid = await bcrypt.compare(password , user.password);

        if(!passwordValid) {
            return res.status(401).json({
                status : 401 , 
                message : "Incorrect Password !"
            })
        };

        const token = jwt.sign({
            id : user._id , 
            role : user.role
        } , process.env.JWT_SECRET);

        res.cookie("token" , token); 

        res.status(200).json({
            status : 200 , 
            message : "Login Successfully !" , 
            user : user
        })
    } catch (e) {
        res.status(500).json({
            status : 500 , 
            error_Message : e.message
        })
    }
}

async function logoutUser (req , res) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            status : 200 , 
            message : 'Logout Successfully !'
        })
    } catch (e) {
        res.status(500).json({
            status : 500 , 
            error : e.message
        })
    }
}

module.exports = {registerUser , loginUser , logoutUser}
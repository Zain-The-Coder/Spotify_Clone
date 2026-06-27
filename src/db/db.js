const mongoose = require('mongoose');

async function connectDb () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log((`MongoDB Connected Successfully ! Host: ${mongoose.connection.host}`));
    } catch (e) {
        console.log((`MongoDb Not Connected Due To : ${e.message}`));
    }
};

module.exports = connectDb;

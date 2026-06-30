const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route.js');
const musicRouter = require('./routes/music.route.js');

const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth' , authRoutes);
app.use('/api/music' , musicRouter);

module.exports = app ;
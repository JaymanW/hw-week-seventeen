const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const port = 3000;

// const uri = `mongodb+srv://sliderDB:${process.env.mongo_password}@slider.opswz.mongodb.net/slider?retryWrites=true&w=majority`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// mongoose.connect(process.env.)

app.listen(process.env.PORT || port, () => {
    console.log(`Server successfully running on port: ${process.env.PORT || port}`)
})
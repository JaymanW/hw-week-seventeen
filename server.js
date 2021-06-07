const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const port = 3000;

console.log(process.env.mongo_password);

// const uri = `mongodb+srv://sliderDB:${process.env.mongo_password}@slider.opswz.mongodb.net/slider?retryWrites=true&w=majority`;
const uri = `mongodb+srv://dbUser:${process.env.mongo_password}@cluster0.3wf9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"))
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"))
})

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server successfully running on port: ${process.env.PORT || port}`)
})
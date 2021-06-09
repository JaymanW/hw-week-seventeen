const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const Exercise = require('./models');

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const uri = `mongodb+srv://dbUser:${process.env.mongo_password}@cluster0.3wf9l.mongodb.net/hw-week-seventeen?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

// MAIN PAGES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"))
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"))
})

// API ROUTES
app.get('/api/workouts', (req, res) => {
    Exercise.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        },
    ]).then(exercise => {
        res.json(exercise);
    })
})

app.get('/api/workouts/range', (req, res) => {
    Exercise.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        },
    ]).sort({ day: -1 }).limit(7).then(exercise => {
        res.json(exercise);
    })
})

// app.get('/hulu', (req, res) => {
//     res.send('hulu baby')
// })

// API FUNCTIONS
const getWorkouts = () => {
    // const exercisesDB = client.db("hw-week-seventeen").collection("exercises");
    // const query = exercisesDB.find({}).sort({ day: -1 }).limit(7);
    Exercise.aggregate([
        {
            $addFields: {
                combinedDuration: { $sum: '$exercises.duration' }
            }
        },
    ]).sort({ day: -1 }).limit(7).then(exercise => {
        res.json(exercise);
    })
}

// app.put('/api/workouts/:id', (({ body, params }, res) => {
//     console.log(body);
// }))

// const collection = client.db("test").collection("devices");



app.listen(process.env.PORT || port, () => {
    console.log(`Server successfully running on port: ${process.env.PORT || port}`)
})

// http://localhost:3000/api/workouts/range
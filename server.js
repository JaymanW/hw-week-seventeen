const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const Workout = require('./models/workoutSchema');

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
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        },
    ]).then(workout => {
        res.json(workout);
    })
})

app.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        },
    ]).sort({ day: -1 }).limit(7).then(workout => {
        res.json(workout);
    })
})

app.post('/api/workouts', (req, res) => {
    Workout.create({}).then(workout => res.json(workout));
})

app.put('/api/workouts/:id', ({ params, body }, res) => {
    Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body } },
        { new: true } 
    ).then(workout => {
        res.json(workout);
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server successfully running on port: ${process.env.PORT || port}`)
})
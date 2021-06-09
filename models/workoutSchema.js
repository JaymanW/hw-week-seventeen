const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: 'Select type of exercise.',
            trim: true
        },
        name: {  
            type: String,
            required: 'Select type of exercise.',
            trim: true
        },
        duration: {
            type: Number,
            required: 'Select duration of exercise.',
            trim: true
        },
        distance: {
            type: Number,
            trim: true
        },
        weight: {
            type: Number,
            trim: true
        },
        reps: {
            type: Number,
            trim: true
        },
        sets: {
            type: Number,
            trim: true
        }
    }]
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

// CARDIO
// type
// name
// distance
// duration

// RESISTANCE
// name
// weight
// sets
// reps
// duation
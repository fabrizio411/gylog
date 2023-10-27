import mongoose from 'mongoose'
import { daysArray } from '../utils/constants'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    image: { type: String }, 
    units: {
        weight: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
        distance: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
        size: { type: String, enum: ['metric', 'imperial'], default: 'metric' },

    },
    isPremium: { type: Boolean, required: true, default: false },
    firstWeekDay: { type: String, enum: daysArray, default: 'monday' },
    routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    measures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Measure' }],
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
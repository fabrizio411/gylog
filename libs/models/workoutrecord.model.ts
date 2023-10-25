import mongoose from 'mongoose'
import { unitsArray } from '../utils/constants'

const workoutrecordSchema = new mongoose.Schema({
    note: { type: String },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    dataOne: { type: Number, required: true },
    unitOne: { type: String, required: true, enum: unitsArray },
    dataTwo: { type: Number, },
    unitTwo: { type: String, enum: unitsArray },
    rpe: { type: Number },
    rir: { type: Number },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    routine: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Workoutrecord = mongoose.models.Workoutrecord || mongoose.model('Workoutrecord', workoutrecordSchema)

export default Workoutrecord
import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
    note: { type: String },
    routine: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine', required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
})

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)

export default Workout
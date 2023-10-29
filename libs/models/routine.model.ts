import mongoose from 'mongoose'

const routineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String },
    exercises: [
        {
            exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
            sets: { type: Number, required: true },
            note: { type: String }
        }
    ],
    file: { type: mongoose.Schema.Types.ObjectId, ref: 'Routinefile' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const Routine = mongoose.models.Routine || mongoose.model('Routine', routineSchema)

export default Routine
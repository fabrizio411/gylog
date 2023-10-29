import mongoose from 'mongoose'

const routineFileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    routines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Routinefile = mongoose.models.Routinefile || mongoose.model('Routinefile', routineFileSchema)

export default Routinefile
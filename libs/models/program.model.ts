import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
    week: {
        mon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        tue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        wed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        thu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        fri: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        sat: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }],
        sun: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Routine' }]
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Program = mongoose.models.Program || mongoose.model('Program', programSchema)

export default Program
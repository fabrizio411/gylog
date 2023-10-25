import mongoose from 'mongoose'
import { unitsArray } from '../utils/constants'

const measurerecordSchema = new mongoose.Schema({
    measure: { type: mongoose.Schema.Types.ObjectId, ref: 'Measure', required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true, enum: unitsArray },
    date: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Measurerecord = mongoose.models.Measurerecord || mongoose.model('Measurerecord', measurerecordSchema)

export default Measurerecord
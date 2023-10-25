import mongoose from 'mongoose'
import { unitsArray } from '../utils/constants'

const measureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    toMeasure: { type: String, required: true, enum: ['weight', 'lenght', 'percentage'] },
    useUnit: { type: String, required: true, enum: unitsArray },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Measure = mongoose.models.Measure || mongoose.model('Measure', measureSchema)

export default Measure
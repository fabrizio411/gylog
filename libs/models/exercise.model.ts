import mongoose from 'mongoose'
import { exerciseCategoryArray, musclesArray } from '../utils/constants'

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String },
    category: { type: String, required: true, enum: exerciseCategoryArray },
    muscle: { type: String, required: true, enum: musclesArray },
    favouriteBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{
    timestamps: true
})

const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema)

export default Exercise
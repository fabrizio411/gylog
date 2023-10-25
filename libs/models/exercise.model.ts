import mongoose from 'mongoose'
import { exerciseVariantsArray, musclesArray } from '../utils/constants'

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    variant: { type: String, required: true, enum: exerciseVariantsArray },
    muscle: { type: String, required: true, enum: musclesArray },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{
    timestamps: true
})

const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema)

export default Exercise
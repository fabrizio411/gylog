import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    image: { type: String }, 
    units: {
        weight: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
        distance: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    },
    isPremium: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
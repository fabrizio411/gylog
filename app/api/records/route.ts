import Workout from '@/libs/models/workout.model'
import { connectDB } from '@/libs/mongoose'
import getUser from '@/libs/utils/getUser'
import { TypeUser } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        const user: Partial<TypeUser> = await getUser()

        const workouts = Workout.find({ user: user._id })

        return NextResponse.json(workouts)
        
    } catch (error) {
        console.log('GET_WORKOUTS_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 }) 
    }
}
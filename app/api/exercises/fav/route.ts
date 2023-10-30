import Exercise from '@/libs/models/exercise.model'
import getUser from '@/libs/utils/getUser'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()
        
        const user = await getUser()

        // Obtener los ejercicios favoritos del usuario
        const favExercises = Exercise.find({ favouriteBy: user._id })

        return NextResponse.json(favExercises)
        
    } catch (error) {
        console.log('GET_FAV_EXERCISES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
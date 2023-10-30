import Exercise from '@/libs/models/exercise.model'
import Routine from '@/libs/models/routine.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        // Obtener rutinas sin usuario asociado.
        const generalRoutines = await Routine.find({ user: { $in: [null, undefined] } })
        .populate({
            path: 'exercises.exercise',
            model: Exercise,
        })

        // if (!generalRoutines) {
        //     return NextResponse.json({ message: 'Error loading routines', error: true })
        // }

        return NextResponse.json(generalRoutines)
        
    } catch (error) {
        console.log('GET_GENERAL_ROUTINES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
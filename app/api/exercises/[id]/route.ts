import Exercise from '@/libs/models/exercise.model'
import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { TypeExerciseCategory, TypeMuscles } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request
) {
    try {
        connectDB()

        const id = req.url.slice(req.url.lastIndexOf('/') + 1)

        const exercise = await Exercise.findById(id)

        if (!exercise) {
            return NextResponse.redirect(new URL('/exercises'))
        }

        return NextResponse.json(exercise)
        
    } catch (error) {
        console.log('GET_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request
) {
    try {
        connectDB()

        const id = req.url.slice(req.url.lastIndexOf('/') + 1)

        const deletedExercise = await Exercise.findByIdAndDelete(id)

        if (!deletedExercise) {
            return NextResponse.json({ message: 'Error deleting exercise', error: true })
        }

        // Eliminar id del ejercicio del User
        await User.findByIdAndUpdate(
            deletedExercise.user,
            { $pull: { exercises: id } }
        )

        // Eliminar ejercicio de las rutinas actuales
        const routines = await Routine.find({ 
            'exercises.exercise': id,
            user: deletedExercise.user 
        }).select('_id')

        for (let i = 0; i < routines.length; i++) {
            await Routine.findByIdAndUpdate(
                routines[i]._id,
                { $pull: { exercises: { exercise: id } } }
            )
        }

        return NextResponse.json({ message: 'Exercise deleted' })
        
    } catch (error) {
        console.log('DELETE_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PUT(
    req: Request,
) {
    const id = req.url.slice(req.url.lastIndexOf('/') + 1)

    const {
        name,
        note, 
        muscle, 
    }: {
        name: string,
        note: string,
        muscle: TypeMuscles,
    } = await req.json()

    if (!name || !muscle) {
        return NextResponse.json({ message: 'Missing info' })
    }

    try {
        connectDB()

        // Update Exercise
        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            {
                name,
                note,
                muscle,
            },
            { new: true }
        )

        if (!updatedExercise) {
            return NextResponse.json({ message: 'Error updating exercise', error: true })
        }

        return NextResponse.json({ message: 'Exercise updated' })
        
    } catch (error) {
        console.log('UPDATE_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
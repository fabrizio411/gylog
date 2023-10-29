import Exercise from '@/libs/models/exercise.model'
import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { TypeExercise } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const {
        name,
        note, 
        category, 
        muscle, 
        userId 
    } = await req.json()

    // Verificar informacion valida
    if (!name || !category || !muscle || !userId) {
        return NextResponse.json({ message: 'Missing info' })
    }

    try {
        connectDB()

        // Crear Exercise
        const newExercise: TypeExercise = await Exercise.create({
            name,
            note,
            category,
            muscle,
            user: userId
        })

        // Guardar el id del ejercicio en el array de ejercicios del usuario
        await User.findByIdAndUpdate(
            userId,
            { $push: { exercises: newExercise._id } }
        )

        return NextResponse.json({ message: 'Exercise created', error: true  })
        
    } catch (error) {
        console.log('CREATE_EXERCISE', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const {
        userId,
        exerciseId
    } = await req.json()

    try {
        connectDB()

        // Eliminar ejercicio solo si el usuario es el creador.
        const deletedExercise = await Exercise.findByIdAndDelete(
            exerciseId,
            { new: true }
        ).where({ user: userId })
        
        if (!deletedExercise) {
            return NextResponse.json({ message: 'Error deleting exercise', error: true })
        }

        // Eliminar id del ejercicio del User
        await User.findByIdAndUpdate(
            userId,
            { $pull: { exercises: exerciseId } }
        )

        // Eliminar ejercicio de las rutinas actuales
        const routines = await Routine.find({ 
            'exercises.exercise': exerciseId,
            user: userId 
        }).select('_id')

        for (let i = 0; i < routines.length; i++) {
            await Routine.findByIdAndUpdate(
                routines[i]._id,
                { $pull: { exercises: { exercise: exerciseId } } }
            )
        }

        return NextResponse.json({ message: 'Exercise deleted' })
        
    } catch (error) {
        console.log('DELETE_EXERCISE', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PUT(req: Request) {
    const {
        name,
        note, 
        category, 
        muscle, 
        userId,
        exerciseId
    } = await req.json()

    if (!name || !category || !muscle || !userId || !exerciseId) {
        return NextResponse.json({ message: 'Missing info' })
    }

    try {
        connectDB()

        // Update Exercise
        await Exercise.findByIdAndUpdate(
            exerciseId,
            {
                name,
                note,
                category,
                muscle,
            }
        ).where({ user: userId })
        
    } catch (error) {
        console.log('UPDATE_EXERCISE', error)
        return new NextResponse('Internal Error', { status: 500 })
    }

}
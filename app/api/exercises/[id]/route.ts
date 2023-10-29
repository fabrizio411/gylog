import Exercise from "@/libs/models/exercise.model"
import Routine from "@/libs/models/routine.model"
import User from "@/libs/models/user.model"
import { connectDB } from "@/libs/mongoose"
import { TypeExerciseCategory, TypeMuscles } from "@/libs/utils/types"
import { NextResponse } from "next/server"

export async function DELETE(
    { params }: { 
        params: { id: string } 
    }
) {
    try {
        connectDB()

        // Eliminar ejercicio solo si el usuario es el creador.
        const deletedExercise = await Exercise.findByIdAndDelete(
            params.id,
            { new: true }
        )

        if (!deletedExercise) {
            return NextResponse.json({ message: 'Error deleting exercise', error: true })
        }

        // Eliminar id del ejercicio del User
        await User.findByIdAndUpdate(
            deletedExercise.user,
            { $pull: { exercises: params.id } }
        )

        // Eliminar ejercicio de las rutinas actuales
        const routines = await Routine.find({ 
            'exercises.exercise': params.id,
            user: deletedExercise.user 
        }).select('_id')

        for (let i = 0; i < routines.length; i++) {
            await Routine.findByIdAndUpdate(
                routines[i]._id,
                { $pull: { exercises: { exercise: params.id } } }
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
    { params }: { 
        params: { id: string } 
    }
) {
    const {
        name,
        note, 
        category, 
        muscle, 
    }: {
        name: string,
        note: string,
        category: TypeExerciseCategory,
        muscle: TypeMuscles,
    } = await req.json()

    if (!name || !category || !muscle) {
        return NextResponse.json({ message: 'Missing info' })
    }

    try {
        connectDB()

        // Update Exercise
        await Exercise.findByIdAndUpdate(
            params.id,
            {
                name,
                note,
                category,
                muscle,
            }
        )
        
    } catch (error) {
        console.log('UPDATE_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
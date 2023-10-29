import Exercise from '@/libs/models/exercise.model'
import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import getUser from '@/libs/utils/getUser'
import { TypeExercise, TypeExerciseCategory, TypeMuscles, TypeUser } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const user: Partial<TypeUser> = await getUser()

        // Obtiene los ejercicios del usuario o los que no tienen usuario asigando (generales)
        const exercises = await Exercise.find({
            user: {
                $in: [null, undefined, user._id]
            }
        })

        if (!exercises) {
            return NextResponse.json({ message: 'Error loading exercises', error: true })
        }

        return NextResponse.json(exercises)

    } catch (error) {
        console.log('GETEXERCISES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(req: Request) {
    const {
        name,
        note, 
        category, 
        muscle,
        userId
    }: {
        name: string,
        note: string,
        category: TypeExerciseCategory,
        muscle: TypeMuscles,
        userId: string
    } = await req.json()

    // Verificar informacion valida
    if (!name || !category || !muscle) {
        return NextResponse.json({ message: 'Missing info' })
    }

    try {
        connectDB()

        const user = await User.findById(userId)
        .select('isPremium exercises')

        // Verificar si es usuario grtis y si puede crear mas ejercicios
        if (!user.isPremium && user.exercises.length >= 5) {
            return NextResponse.json({ message: 'Max exercises created', error: true })
        }

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
        console.log('CREATE_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
'use server'

import { revalidatePath } from 'next/cache';
import Exercise from '../models/exercise.model';
import User from '../models/user.model';
import { TypeExerciseCategory, TypeMuscles } from '../utils/types';
import { connectDB } from '../mongoose';
import Routine from '../models/routine.model';


export async function exerciseCreate({
    name,
    note,
    category,
    muscle,
    userId
}: {
    name: string,
    note?: string,
    category: TypeExerciseCategory,
    muscle: TypeMuscles,
    userId: string
}) {
    try {
        // Verificar informacion valida
        if (!name || !category || !muscle || !userId) {
            throw new Error('Missing info')
        }

        connectDB()

        // Crear Exercise
        const newExercise = await Exercise.create({
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

        revalidatePath('/exercises')
        
    } catch (error: any) {
        throw new Error(`EXERCISE_CREATE_ERROR: ${error.message}`)
    }
}

export async function exerciseDelete({
    userId,
    exerciseId,
}: {
    userId: string,
    exerciseId: string
}) {
    try {
        connectDB()

        // Eliminar ejercicio solo si el usuario es el creador.
        const deletedExercise = await Exercise.findByIdAndDelete(
            exerciseId,
            { new: true }
        ).where({ user: userId })
        
        if (!deletedExercise) {
            throw new Error('Error deleting the exercise.')
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

        revalidatePath('/exercises')

    } catch (error: any) {
        throw new Error(`EXERCISE_DELETE_ERROR: ${error.message}`)
    }
}

export async function exerciseUpdate({
    name,
    note,
    category,
    muscle,
    userId,
    exerciseId
}: {
    name: string,
    note?: string,
    category: TypeExerciseCategory,
    muscle: TypeMuscles,
    userId: string,
    exerciseId: string
}) {
    try {
        // Verificar informacion valida
        if (!name || !category || !muscle || !userId) {
            throw new Error('Missing info')
        }

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

        revalidatePath('/exercises')

    } catch (error: any) {
        throw new Error(`EXERCISE_UPDATE_ERROR: ${error.message}`)
    }
}
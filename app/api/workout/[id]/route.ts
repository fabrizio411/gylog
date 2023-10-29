import User from '@/libs/models/user.model'
import Workout from '@/libs/models/workout.model'
import Workoutrecord from '@/libs/models/workoutrecord.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function POST(
    req: Request,
    { params }: {
        params: { id: string }
    }
) {
    const {
        note,
        records,
        userId
    }: {
        note: string,
        records: [{
            note?: string,
            exercise: string,
            dataOne: number,
            unitOne: string,
            dataTwo: number,
            unitTwo: string,
            rpe?: number,
            rir?: number,
        }],
        userId: string
    } = await req.json()

    try {
        connectDB()

        // Crear nueva instancia del workout
        const newWorkout = new Workout({
            note,
            routine: params.id,
            records: [],
            user: userId
        })

        // Crear todos los records del workout
        for (let i = 0; i < records.length; i++) {
            let record = records[i]
            const newRecord = await Workoutrecord.create({
                note: record.note,
                exercise: record.exercise,
                dataOne: record.dataOne,
                unitOne: record.unitOne,
                dataTwo: record.dataTwo,
                unitTwo: record.unitTwo,
                rpe: record.rpe,
                rir: record.rir,
                workout: newWorkout._id,
                routine: params.id,
                user: userId
            })
            
            // Agregar el id del new record al workout
            newWorkout.records.push(newRecord._id)
        }

        // Agregar el id del workoit al usuario
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { workouts: newWorkout._id }
            }
        )

        newWorkout.save()

        return NextResponse.json({ message: 'Workout saved' })

    } catch (error) {
        console.log('CREATE_WORKOUT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
import User from '@/libs/models/user.model'
import Workout from '@/libs/models/workout.model'
import Workoutrecord from '@/libs/models/workoutrecord.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function GET(
    { params }: { 
        params: { id: string } 
    }
) {
    try {
        connectDB()

        const userWorkout = Workout.findById(params.id)

        if (!userWorkout) {
            return NextResponse.json({ message: 'Error loading workouts', error: true })
        }

        return NextResponse.json(userWorkout)
        
    } catch (error) {
        console.log('GET_WORKOUT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 }) 
    }
}

export async function DELETE(
    { params }: { 
        params: { id: string } 
    }
) {
    try {
        connectDB()

        const deletedWorkout = await Workout.findByIdAndDelete(params.id)

        if (!deletedWorkout) {
            return NextResponse.json({ message: 'Error deleting exercise', error: true })
        }

        // Eliminar workout del usuario
        await User.findByIdAndUpdate(
            deletedWorkout.user,
            {
                $pull: { workouts: deletedWorkout._id }
            }
        )

        // Eliminar todos los records asociados al workout
        await Workoutrecord.deleteMany({ _id: { $in: deletedWorkout.records } })

        return NextResponse.json({ message: 'Workout deleted' })
        
    } catch (error) {
        console.log('DELETE_WORKOUT_ERROR', error)
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

        const userWorkout = await Workout.findById(params.id)

        if (!userWorkout) {
            return NextResponse.json({ message: 'Workout not found', error: true })
        }

        await Workoutrecord.deleteMany({ _id: { $in: userWorkout.records } })

        // Eliminar los viejos docuemtnos de record

        userWorkout.records = []

        // Crear todos los nuevos records del workout
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
                workout: userWorkout._id,
                routine: params.id,
                user: userId
            })
            
            // Agregar el id del new record al workout
            userWorkout.records.push(newRecord._id)
        }
        
        userWorkout.save()

        return NextResponse.json({ message: 'Workout updated' })
        
    } catch (error) {
        console.log('UPDATE_WORKOUT_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
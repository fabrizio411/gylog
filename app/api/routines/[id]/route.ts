import Exercise from '@/libs/models/exercise.model'
import Program from '@/libs/models/program.model'
import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { TypeProgram } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET(
    { params }: { 
        params: { id: string } 
    }
) {
    try {
        connectDB()

        // Buscar la rutina y sumarle la informacion de los ejercicios
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // TESTEAR SI FUNCIONA
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        const routine = await Routine.findById(params.id)
        .populate({
            path: 'exercises.exercise',
            model: Exercise,
        })

        if (!routine) {
            return NextResponse.redirect(new URL('/routines'))
        }

        return NextResponse.json(routine)
        
    } catch (error) {
        console.log('GET_ROUTINE_ERROR', error)
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

        const deletedRoutine = await Routine.findByIdAndDelete(params.id)   
        
        if (!deletedRoutine) {
            return NextResponse.json({ message: 'Error deleting routine', error: true })
        }

        // Eliminar id de la rutina del User
        await User.findByIdAndUpdate(
            deletedRoutine.user,
            { $pull: { routines: deletedRoutine._id } }
        )

        // Eliminar la rutina en caso de estar en el program
        const userPrgoram = await Program.findOne({ user: deletedRoutine.user })

        for (const key in userPrgoram.week) {
            let dayArray = userPrgoram.week[key]
            if (dayArray.includes(deletedRoutine._id)) {
                dayArray.splice(dayArray.indexOf(deletedRoutine._id), 1)
            }
        }

        await userPrgoram.save()

        return NextResponse.json({ message: 'Routine deleted' })
        
    } catch (error) {
        console.log('DELETE_ROUTINE_ERROR', error)
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
        exercises,
        
    }: {
        name: string,
        note: string,
        exercises: [{
            exercise: string,
            sets: number,
            note: string
        }],
    } = await req.json()

    if (!name) {
        return NextResponse.json({ message: 'Routine name missing', error: true })
    }

    if (!exercises) {
        return NextResponse.json({ message: 'Add at least one exercise', error: true })
    }

    try {
        connectDB()

        const updatedRoutine = await Routine.findByIdAndUpdate(
            params.id,
            {
                name,
                note,
                exercises
            },
            { new: true }
        )

        if (!updatedRoutine) {
            return NextResponse.json({ message: 'Error updating routine', error: true })
        }

        return NextResponse.json({ message: 'Routine updated'})
        
    } catch (error) {
        console.log('UPDATE_ROUTINE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
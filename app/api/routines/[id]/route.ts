import Exercise from '@/libs/models/exercise.model'
import Program from '@/libs/models/program.model'
import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
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
            const path = req.url

            if (path.includes('/routines')) {
                return NextResponse.redirect(new URL('/routines'))
            }

            return NextResponse.redirect(new URL('/'))

        }

        return NextResponse.json(routine)
        
    } catch (error) {
        console.log('GET_ROUTINE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
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
        userId
    }: {
        name: string,
        note: string,
        exercises: [{
            exercise: string,
            sets: number,
            note: string
        }],
        userId: string
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
        ).where({ user: userId })

        if (!updatedRoutine) {
            return NextResponse.json({ message: 'Error updating routine', error: true })
        }

        return NextResponse.json({ message: 'Routine updated'})
        
    } catch (error) {
        console.log('UPDATE_ROUTINE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

// Save existing routine
export async function POST(
    req: Request,
    { params }: { 
        params: { id: string } 
    }
) {
    const { userId }: { userId: string } = await req.json()

    try {
        connectDB()

        const user = await User.findById(userId)
        .select('isPremium routines')
    
        // Verificar si es usuario grtis y si puede crear mas rutinas
        if (!user.isPremium && user.routines.length >= 5) {
            return NextResponse.json({ message: 'Max routines created', error: true })
        }

        const routine = await Routine.findById(params.id)
        .populate({
            path: 'user',
            model: User,
            select: '_id username' 
        })

        if (!routine) {
            return NextResponse.json({ message: 'Error saving routine', error: true })
        }

        const newRoutine = await Routine.create({
            name: routine.name + ` - ${routine.user.username}`,
            note: routine.note,
            exercises: routine.exercises,
            file: undefined,
            user: userId
        })

        if (!newRoutine) {
            return NextResponse.json({ message: 'Error saving routine', error: true })
        }

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { routines: newRoutine._id }
            }
        )
        
        return NextResponse.json({ message: 'Routine saved' })

    } catch (error) {
        
    }
}
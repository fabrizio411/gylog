import Routine from '@/libs/models/routine.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import getUser from '@/libs/utils/getUser'
import { TypeRoutine, TypeUser } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        const user: Partial<TypeUser> = await getUser()

        const routines = await Routine.find({ user: user._id })

        if (!routines) {
            return NextResponse.json({ message: 'Error loading routines', error: true })
        }

        return NextResponse.json(routines)
        
    } catch (error) {
        console.log('GET_ROUTINES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(req: Request) {
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

    // Verificar informacion valida
    if (!name) {
        return NextResponse.json({ message: 'Routine name missing', error: true })
    }

    if (!exercises) {
        return NextResponse.json({ message: 'Add at least one exercise', error: true })
    }
    
    try {
        connectDB()

        const user = await User.findById(userId)
        .select('isPremium routines')
    
        // Verificar si es usuario grtis y si puede crear mas rutinas
        if (!user.isPremium && user.routines.length >= 5) {
            return NextResponse.json({ message: 'Max routines created', error: true })
        }
    
        // Crear rutina
        const newRoutine: TypeRoutine = await Routine.create({
            name,
            note,
            exercises,
            user: userId
        })
    
        await User.findByIdAndUpdate(
            userId,
            { $push: { routines: newRoutine._id }}
        )
        
    } catch (error) {
        console.log('CREATE_ROUTINE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
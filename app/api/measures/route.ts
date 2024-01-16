import Measure from '@/libs/models/measure.model'
import User from '@/libs/models/user.model'
import getUser from '@/libs/utils/getUser'
import { connectDB } from '@/libs/mongoose'
import { TypeToMeasure, TypeUnits, TypeUser } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        const user: Partial<TypeUser> = await getUser()

        const measures = await Measure.find({ user: user._id })

        return NextResponse.json(measures)
        
    } catch (error) {
        console.log('GET_MEASURES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(req: Request) {
    const {
        name,
        toMeasure,
        useUnit,
        userId
    }: {
        name: string,
        toMeasure: TypeToMeasure,
        useUnit: TypeUnits,
        userId: string
    } = await req.json()

    try {
        connectDB()

        // Crear nueva measure
        const newMeasure = await Measure.create({
            name,
            toMeasure,
            useUnit,
            records: [],
            user: userId
        })

        if (!newMeasure) {
            return NextResponse.json({ message: 'Error creating measure', error: true })
        }

        // Agregar measure al user
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { measures: newMeasure._id }
            }
        )

        return NextResponse.json({ message: 'Measure created', id: newMeasure._id })
        
    } catch (error) {
        console.log('CREATE_MEASURES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}


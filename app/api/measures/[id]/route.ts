import Measure from '@/libs/models/measure.model'
import Measurerecord from '@/libs/models/measurerecord.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { TypeUnits } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request
) {
    try {
        connectDB()

        const id = req.url.slice(req.url.lastIndexOf('/') + 1)

        // Obtener measure y sus records
        const measureInfo = await Measure.findById(id)
        .populate({
            path: 'records',
            model: Measurerecord,
        })

        if (!measureInfo) {
            return NextResponse.json({ message: 'Error loading measure', error: true })
        }

        return NextResponse.json(measureInfo)
        
    } catch (error) {
        console.log('GET_MEASURE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request
) {
    try {
        connectDB()

        const id = req.url.slice(req.url.lastIndexOf('/') + 1)

        // Borrar measure
        const deletedMeasure = await Measure.findByIdAndDelete(id)

        if (!deletedMeasure) {
            return NextResponse.json({ message: 'Error deleting measure', error: true })
        }

        // Borrar id de measure del user
        await User.findByIdAndUpdate(
            deletedMeasure.user,
            {
                $pull: { measures: deletedMeasure._id }
            }
        )

        // Borrar todos los records asociados de esa measure
        await Measurerecord.deleteMany({ _id: { $in: deletedMeasure.records } })

        return NextResponse.json({ message: 'Measure deleted' })
        
    } catch (error) {
        console.log('DELETE_MEASURE_ERROR', error)
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
        useUnit,
        userId
    }: {
        name: string,
        useUnit: TypeUnits,
        userId: string
    } = await req.json()

    try {
        connectDB()

        const updatedMeasure = await Measure.findByIdAndUpdate(
            params.id,
            {
                name,
                useUnit
            },
            { new: true }
        ).where({ user: userId })

        if (!updatedMeasure) {
            return NextResponse.json({ message: 'Error updatin measure', error: true })
        }

        return NextResponse.json({ message: 'Measure updated' })
        
    } catch (error) {
        console.log('UPDATE_MEASURE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
import { NextResponse } from 'next/server'
import { connectDB } from '@/libs/mongoose'
import Measurerecord from '@/libs/models/measurerecord.model'
import Measure from '@/libs/models/measure.model'
import { TypeUnits } from '@/libs/utils/types'

export async function DELETE(
    req: Request
) {
    try {
        connectDB()

        const id = req.url.slice(req.url.lastIndexOf('/') + 1)

        const deletedMeasureRecord = await Measurerecord.findByIdAndDelete(id)

        if (!deletedMeasureRecord) {
            return NextResponse.json({ message: 'Error deleting measure', error: true })
        }

        await Measure.findByIdAndUpdate(
            deletedMeasureRecord.measure,
            {
                $pull: { records: deletedMeasureRecord._id }
            }
        )

        return NextResponse.json({ message: 'Measure deleted' })
        
    } catch (error) {
        console.log('DELETE_MEASURE_RECORD_ERROR', error)
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
        value,
        unit,
        date,
        userId
    }: {
        value: number,
        unit: TypeUnits,
        date: Date | string,
        userId: string
    } = await req.json()

    try {
        connectDB()

        const updatedMeasureRecord = await Measurerecord.findByIdAndUpdate(
            params.id,
            {
                value,
                unit,
                date,
            }
        ).where({ user: userId })

        if (!updatedMeasureRecord) {
            return NextResponse.json({ message: 'Error updating measure', error: true })
        }

        return NextResponse.json({ message: 'Measure updated' })
        
    } catch (error) {
        console.log('UPDATE_MEASURE_RECORD_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
import Measure from '@/libs/models/measure.model'
import Measurerecord from '@/libs/models/measurerecord.model'
import { connectDB } from '@/libs/mongoose'
import { TypeUnits } from '@/libs/utils/types'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    const {
        measureId,
        value,
        unit,
        date,
        userId
    }: {
        measureId: string,
        value: number,
        unit: TypeUnits,
        date: Date | string,
        userId: string
    } = await req.json()

    try {
        connectDB()

        const newMeasureRecord = await Measurerecord.create({
            measure: measureId,
            value,
            unit,
            date,
            user: userId
        })

        if (!newMeasureRecord) {
            return NextResponse.json({ message: 'Error uploading measure', error: true })
        }

        await Measure.findByIdAndUpdate(
            measureId,
            {
                $push: { records: newMeasureRecord._id }
            }
        )

        return NextResponse.json({ message: 'Measure uploaded' })
        
    } catch (error) {
        console.log('CREATE_MEASURE_RECORD_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
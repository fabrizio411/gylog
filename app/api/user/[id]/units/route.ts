import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(
    req: Request,
    { params }: { 
        params: { id: string } 
    }
) {
    const {
        weight,
        distance,
        size
    }: {
        weight: 'kg' | 'lbs',
        distance: 'metric'| 'imperial',
        size: 'metric' | 'imperial'
    } = await req.json()

    const newUnits = {
        weight,
        distance,
        size
    }

    try {
        connectDB()

        const updatedUser = await User.findByIdAndUpdate(
            params.id,
            {
                units: newUnits
            }
        )

        if (!updatedUser) {
            return NextResponse.json({ message: 'Error updating units', error: true })
        }

        return NextResponse.json({ message: 'Units updated' })
        
    } catch (error) {
        console.log('GET_USER_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
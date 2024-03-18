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

        const user = await User.findById(params.id)

        if (!user) {
            return NextResponse.json({ message: 'Error loading user', error: true  })
        }

        return NextResponse.json(user)
        
    } catch (error) {
        console.log('GET_USER_ERROR', error)
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
        username,
        image
    }: {
        username: string,
        image: string
    } = await req.json()

    try {
        connectDB()
        
        const updatedUser = await User.findByIdAndUpdate(
            params.id,
            {
                username,
                image
            }
        )

        if (!updatedUser) {
            return  NextResponse.json({ message: 'Error updating user', error: true })
        }

        return NextResponse.json({ message: 'User updated' })
        
    } catch (error) {
        console.log('UPDATE_USER_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
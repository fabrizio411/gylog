import { connectDB } from '@/libs/mongoose'
import getUser from '@/libs/utils/getUser'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        const user = await getUser()

        if (!user) {
            return NextResponse.json({ message: 'Error loading user', error: true  })
        }

        return NextResponse.json(user)
        
    } catch (error) {
        console.log('GET_USER_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
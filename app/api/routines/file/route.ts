import Routinefile from '@/libs/models/routinefile.model'
import { connectDB } from '@/libs/mongoose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const {
        name,
        routines,
        userId
    }: {
        name: string,
        routines: string[],
        userId: string
    } = await req.json()

    if (!name) {
        return NextResponse.json({ message: 'File name is missing', error: true })
    }

    try {
        connectDB()

        const newFile = await Routinefile.create({
            name,
            routines,
            user: userId
        })

        if (!newFile) {
            return NextResponse.json({ message: 'Create file error', error: true })
        }

        return NextResponse.json({ message: 'File created' })
        
    } catch (error) {
        console.log('CREATE_ROUTINE_FILES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
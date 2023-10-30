import Program from '@/libs/models/program.model'
import { connectDB } from '@/libs/mongoose'
import getUser from '@/libs/utils/getUser'
import { TypeDays } from '@/libs/utils/types'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        connectDB()

        const user = await getUser()

        const userProgram = await Program.findById(user.program)
    
        if (!userProgram) {
            return NextResponse.json({ message: 'Error loading program', error: true })
        }
    
        return NextResponse.json(userProgram)
        
    } catch (error) {
        console.log('UPDATE_PROGRAM_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }

}

export async function PUT(req: Request) {
    const {
        programId,
        dayEdited,
        routines
    }: {
        programId: string,
        dayEdited: TypeDays
        routines: string[]
        
    } = await req.json()

    try {
        connectDB()

        // Buscar el program
        const userProgram = await Program.findById(programId)

        if (!userProgram) {
            return NextResponse.json({ message: 'Error updating program', error: true })
        }

        // En el dia editado cambiar las rutinas por el nuevo array de rutinas
        userProgram.week[dayEdited] = routines

        await userProgram.save()

        return NextResponse.json({ message: 'Program updated' })
        
    } catch (error) {
        console.log('UPDATE_PROGRAM_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }


}
import Routine from '@/libs/models/routine.model'
import Routinefile from '@/libs/models/routinefile.model'
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

        // Buscar informacion de la carpeta y completar la informacion de las rutinas
        const file = Routinefile.findById(params.id)
        .populate({
            path: 'routines',
            model: Routine
        })

        if (!file) {
            return NextResponse.json({ message: 'Error loading file', error: true })
        }

        return NextResponse.json(file)
        
    } catch (error) {
        console.log('GET_FILE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: {
        params: { id: string }
    }
) {
    try {
        connectDB()

        const deletedFile = await Routinefile.findByIdAndDelete(params.id)

        if (!deletedFile) {
            return NextResponse.json({ message: 'Error deleting file', error: true })
        }
        
        // Borrar la identificacion a la carpeta de las rutinas de la misma.
        for (let i = 0; i < deletedFile.routines.length; i++) {
            await Routine.findByIdAndUpdate(
                deletedFile.routines[i],
                {
                    $unset: { file: 1 }
                }
            )
        }

        return NextResponse.json({ message: 'File deleted' })
        
    } catch (error) {
        console.log('DELETE_FILE_ERROR', error)
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
        routines,
    }: {
        name: string,
        routines: string[],
    } = await req.json()

    try {
        connectDB()

        const toUpdateFile = await Routinefile.findById(params.id)

        if (!toUpdateFile) {
            return NextResponse.json({ message: 'Error updating file', error: true })
        }
    
        // Borrar la relacion a la carpeta de las rutinas asociadas
        for (let i = 0; i < toUpdateFile.routines.length; i++) {
            await Routine.findByIdAndUpdate(
                toUpdateFile.routines[i],
                {
                    $unset: { file: 1 }
                }
            )
        }

        // Cambiar la informacion del nombre y rutinas por las nuevas
        toUpdateFile.name = name
        toUpdateFile.routines = routines

        await toUpdateFile.save()

        // Agregamos la relacion con las nuevas rutinas
        for (let i = 0; i < toUpdateFile.routines.length; i++) {
            await Routine.findByIdAndUpdate(
                toUpdateFile.routines[i],
                {
                    file: toUpdateFile._id
                }
            )
        }

        return NextResponse.json('File updated')
        
    } catch (error) {
        console.log('UPDATE_FILE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}   
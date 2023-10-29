import Program from '@/libs/models/program.model'
import User from '@/libs/models/user.model'
import { connectDB } from '@/libs/mongoose'
import { TypeUser } from '@/libs/utils/types'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    const {
        username, 
        email,
        password,
        image
    }: Partial<TypeUser> = await req.json()

    if (!username || !email || !password) {
        return NextResponse.json({ message: 'Missing credentials', error: true })
    }

    try {
        connectDB()

        // Verificar disponibilidad del email y username
        const emailFound = await User.findOne({ email })
        if (emailFound) {
            throw new Error('Email already in use')
        }

        const usernameFound = await User.findOne({ username })
        if (usernameFound) {
            throw new Error('Username already in use')
        }

        // Encriptar password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Registrar al usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image,
        })

        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////
        // DEBUG: confirmar si existe _id
        console.log(newUser._id)
        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        // Crear el Program y relacionarlo con el usuario
        const newProgram = await Program.create({
            user: newUser._id
        })

        newUser.program = newProgram._id

        await newUser.save()

        return NextResponse.json({ message: 'Sign Up succesfully'})
        
    } catch (error) {
        console.log('REGISTER_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
} 
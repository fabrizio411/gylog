'use server'

import bcrypt from 'bcrypt'
import { connectDB } from '../mongoose'
import Program from '../models/program.model'
import User from '../models/user.model'

export async function userRegister({
    username,
    email,
    password,
    image
}: {
    username: string,
    email: string,
    password: string,
    image: string
}) {
    try {
        // Verificar credenciales validas
        if (!username || !email || !password ) {
            throw new Error('Missing credentials')
        }

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

    } catch (error: any) {
        throw new Error(`REGISTER_ERROR: ${error.message}`)
    }
}
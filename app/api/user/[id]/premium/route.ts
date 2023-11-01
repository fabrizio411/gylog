import User from "@/libs/models/user.model"
import { connectDB } from "@/libs/mongoose"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    { params }: { 
        params: { id: string } 
    }
) {
    const { currentState }: { currentState: boolean } = await req.json()
    try {
        connectDB()

        const updatedUser = await User.findByIdAndUpdate(
            params.id,
            {
                isPremium: !currentState
            }
        )
        
    } catch (error) {
        console.log('GET_USER_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }

}
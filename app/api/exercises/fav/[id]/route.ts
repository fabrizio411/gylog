import Exercise from "@/libs/models/exercise.model"
import User from "@/libs/models/user.model"
import { connectDB } from "@/libs/mongoose"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: {
        params: { id: string }
    }
) {
    const { userId }: { userId: string } = await req.json()
    try {
        connectDB()

        const favExercise = await Exercise.findById(params.id)

        if (!favExercise) {
            return NextResponse.json({ message: 'Add to favourites error', error: true })
        }

        // Si ya esta en favoritos, eliminarlo
        if (favExercise.favouriteBy.includes(userId)) {
            await Exercise.findByIdAndUpdate(
                params.id,
                {
                    $pull: { favouriteBy: userId }
                }
            )
    
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { favourites: params.id }
                }
            )
            
            return NextResponse.json({ message: 'Removed from favourites' })
        }

        // Agregarlo a favoritos
        await Exercise.findByIdAndUpdate(
            params.id,
            {
                $push: { favouriteBy: userId }
            }
        )

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { favourites: params.id }
            }
        )

        return NextResponse.json({ message: 'Added to favourites' })
        
    } catch (error) {
        console.log('FAVOURITE_EXERCISE_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
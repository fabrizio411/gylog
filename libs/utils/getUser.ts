import { authOptions } from '@/app/api/(auth)/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { connectDB } from '../mongoose';
import User from '../models/user.model';
import { TypeUser } from './types';

// Get next auth session
const getSession = async () => {
    return await getServerSession(authOptions)
}

const getUser = async () => {
    try {
        connectDB()

        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }
        
        // Encontrar usuario
        const user = await User.findOne({ email: session.user.email })
        .select('_id username image units isPremium firstWeekDay')
        
        if (!user) {
            return null
        }
        
        return user
        
    } catch (error) {
        return null
    }
} 

export default getUser
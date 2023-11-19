import * as z from 'zod'

export const RegisterValidation = z.object({
    username: z.string().min(3, { message: 'Usernmae must be at least 3 characters' }).max(30, { message: 'Usernmae must be at most 30 characters' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    image: z.string().optional()
})

export const LoginValidation = z.object({
    email: z.string().email({ message: 'Enter a valid email'}),
    password: z.string(),
})

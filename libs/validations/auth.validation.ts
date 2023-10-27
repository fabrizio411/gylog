import * as z from 'zod'

export const RegisterValidation = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
    image: z.string().optional()
})

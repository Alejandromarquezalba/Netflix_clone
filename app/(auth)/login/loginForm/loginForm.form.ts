import { z } from 'zod';

export const formSchema = z.object({
    email: z.string().min(2, {
        message:'Email muy corto'
    }).max(50),
    password: z.string().min(2, {
        message:'Contraseña muy corta'
    }),
})
import { z } from 'zod';

export const formSchema = z.object({
    email: z.string().min(2, {
        message: 'Email muy corto'
    }).max(50),
    password: z.string().min(2, {
        message: 'Contraseña muy corta'
    }),
    repeatPassword: z.string(),
    
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),

})
.refine((data) => data.password === data.repeatPassword, {
    message: 'La contraseña debe ser idéntica',
    path: ['repeatPassword'],
});




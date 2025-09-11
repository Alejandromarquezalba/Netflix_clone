'use client';

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./registerForm.form"
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

export function RegisterForm() {
    const [backendError, setBackendError] = useState('');

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            },
        })

        const onSubmit = async(values: z.infer<typeof formSchema>) => {
            try {
                setBackendError('');
                const dataToSend = {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                };

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, dataToSend);

                const loginResult = await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                });

                if (loginResult?.error) {
                    //si falla el login, redirigir al login para que inicie manualmente
                    setBackendError('Registro exitoso. Por favor inicia sesión.');
                    setTimeout(() => router.push('/login'), 1500);
                    } else {
                        //si todo sale bien, lo redirijo al inicio
                        router.push('/');
                    }
                router.push('/');


            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error) && error.response) {
                    const errorMessage = error.response.data.message;
                    if (Array.isArray(errorMessage)) {
                        setBackendError(errorMessage.join(', '));
                    } else {
                        setBackendError(errorMessage);
                    }
                    } else {
                    setBackendError('Ocurrió un error inesperado. Inténtalo de nuevo.');
                    }
                }
        };
        
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Nombre de usuario" {...field} className='h-10'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Correo electrónico" {...field} className='h-10'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Contraseña" {...field} type='password' className='h-10'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Repita la Contraseña" {...field} type='password' className='h-10'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {backendError && (
                    <div className="text-red-500 text-sm mt-2">
                        {backendError}
                    </div>
                )}
                <Button type="submit" className='cursor-pointer w-full bg-[#a82128]'>Registrarme</Button>
            </form>
        </Form>
    )
}







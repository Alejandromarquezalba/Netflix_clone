'use client';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./loginForm.form";
import { useState } from "react";
import { FormError } from "./formError";
import axios from "axios";

export default function LoginForm() {
    const [formError, setFormError] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
            },
        })

//LOGEO 
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setFormError(undefined);

        try {
            console.log("Intentando iniciar sesión con:", values);

            const response = await axios.post('http://localhost:3000/auth/login', {
                email: values.email,
                password: values.password,
            });

            console.log("Inicio de sesión exitoso:", response.data);


            if (response.data.user) {
                console.log("Información del usuario:", response.data.user);
            }
            alert('¡Inicio de sesión exitoso! Serás redirigido.');

        } catch (error) {

            console.error("Error al iniciar sesión:", error);
            if (axios.isAxiosError(error) && error.response) {

                console.log("Detalles del error del backend:", error.response.data);

                setFormError(error.response.data.message || 'Credenciales inválidas. Por favor, inténtalo de nuevo.');
            } else {
                setFormError('Ocurrió un error inesperado al iniciar sesión.');
            }
        }
    }


        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-4 flex flex-col">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>

                        <FormControl>
                            <Input placeholder="Correo electrónico" {...field} className="h-14 text-white"/>
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
                            <Input placeholder="Contraseña" {...field} type="password" className="h-14 text-white"/>
                        </FormControl>
                        

                        </FormItem>
                    )}
                    />
                    <FormError message={formError}></FormError>
                    <Button className="w-full cursor-pointer bg-[#a82128]" type="submit">Iniciar sesión</Button>
                </form>
            </Form>
            )
}

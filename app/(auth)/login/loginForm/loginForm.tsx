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
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

import { toast } from 'sonner';


export default function LoginForm() {
    const [formError, setFormError] = useState<string | undefined>('');


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
            },
        })
    
    const router = useRouter();

//LOGEO 
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setFormError(undefined);

        try {
            //llamada a nextauth
            const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });
    
            if (result?.error) {
                //si hay error, se muestras
                toast.error(result.error);
                //setFormError(result.error);
            } else {
                //REDIRECCION A INICIO LOGEO
                toast.success('¡Has iniciado sesión!');
                router.push('/');
            }
    
        } catch (error) {
            console.error("Error inesperado:", error);
            //setFormError('Ocurrió un error inesperado al iniciar sesión.');
            toast.error('Ocurrió un error inesperado al iniciar sesión.');
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

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


export default function LoginForm() {
    const [formError, setFormError] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
            },
        })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        //aquí va el SETERROr
        console.log(values)
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
                    <Button className="w-full bg-red" type="submit">Iniciar sesión</Button>
                </form>
            </Form>
            )
}

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
import { formSchema } from "./registerForm.form";



export function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
            },
        })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
            // Do something with the form values. 
            // ✅ This will be type-safe and validated.
        console.log(values)
    }
        
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit" className='cursor-pointer w-full bg-[#a82128]'>Registrarme</Button>
            </form>
        </Form>
    )
}


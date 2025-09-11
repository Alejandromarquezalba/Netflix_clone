import Link from 'next/link'
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import Terms from '../components/terms/terms'
import LoginForm from './loginForm/loginForm'


export default function LoginPage() {
    return (
        <div>
            <p className='text-3xl font-bold text-left mb-7'>Iniciar sesión</p>
            <LoginForm></LoginForm>
            <div className='mt-5 text-center'>
                <Link href='/' className='hover:underline hover: opacity-70'>¿Has olvidado tu contraseña?</Link>
            </div>
            <div className='flex items-center space-x-2 mt-4'>
                <Checkbox id='terms' className='border-white'></Checkbox>
                <label className='peer-disabled:cursor-not-allowed pper-disabled:opacity-70'>Recuérdame :c</label>
            </div>
            <div className='mt-4 flex gap-1'>
                <p className='text-gray-600 opacity-70'>¿Todavía no tienes cuenta?<br/>
                </p>
            </div>
                    <Link href='/register' className="inline-block transition-all text-font-bold">
                        <Button className="w-full cursor-pointer bg-[#a82128]" type="submit">Registrate aquí</Button>
                    </Link>

            <Terms></Terms>

        </div>
    )
}

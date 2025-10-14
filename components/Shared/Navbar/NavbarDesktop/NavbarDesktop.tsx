'use client';
import { cn } from "@/lib/utils";
import { BellRing, Search } from "lucide-react";
import { MyLogo } from "../../MyLogo";
import { itemsNavbar } from "@/data/itemsNavbar";
import Link from "next/link";
import { scrollPositionFunc } from "@/hooks/scrollPosition";
import { useSession, signIn, signOut } from "next-auth/react";
import { useActiveProfile } from '@/contexts/ActiveProfileContext';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


export function NavbarDesktop() {
    const scrollPosition = scrollPositionFunc();
    console.log(scrollPosition);

    const { data: session, status } = useSession(); 
    
    const [backendError, setBackendError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { activeProfile } = useActiveProfile();


    const displayedNavItems = itemsNavbar.filter(item => {
        return !item.authRequired || status === 'authenticated';
    });


    const handleDemoLogin = async () => {
            try {
                setBackendError('');
                setIsLoading(true);
            
                //datos de la cuenta demo
                const demoCredentials = {
                    email: 'demo@gmail.com',
                    password: 'Demo123654789'
                };
            
                //ontentar login con las credenciales demo
                const result = await signIn('credentials', {
                    email: demoCredentials.email,
                    password: demoCredentials.password,
                    redirect: false,
                });
            
                if (result?.error) {
                    setBackendError('Error al acceder con la cuenta demo');
                } else {
                    router.push('/');
                }
                } catch (error) {
                console.error('Error en acceso demo:', error);
                setBackendError('Error inesperado en acceso demo');
                } finally {
                setIsLoading(false);
                }
            };


    return (
        <div className={cn('left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300 z-20',
            scrollPosition > 20 ? 'bg-zinc-900' : 'bg-transparent'
        )}>
        
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between h-full items-center">
                    
                    <div className="flex gap-2 items-center">
                        <MyLogo></MyLogo>
                        <div className="ml-10 flex gap-4">
                            {displayedNavItems.map((item)=>(
                                <Link key={item.title} href={item.href} className="duration-300 hover:text-gray-400 transition-all">
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        {status === 'authenticated' && <Search/>} 

                        {status === 'authenticated' && <BellRing />} 
                        
{/*---------------------Lógica para mostrar nombre de usuario / botones de autenticación*/}
                        {status === 'loading' && <p>Cargando...</p>} 
                        {status === 'authenticated' && session.user ? (
                            <>
                                <p>
                                Hola, {session.user.name || session.user.email || 'Usuario'}
                                

                                {activeProfile && (
                                    <span className="ml-2 px-2 py-1 rounded-md text-sm text-center">

                                    Perfil activo: {activeProfile.name}
                                    </span>
                                )}
                                </p>

                                <button
                                    onClick={() => signOut()} 
                                    className="duration-300 hover:text-gray-400 transition-all cursor-pointer"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            
                            <div className="flex gap-2 items-center">
                                <Button
                                    onClick={handleDemoLogin}
                                    className="bg-green-600 hover:bg-green-800 font-bold"
                                >
                                    ⚡️Acceso Demo
                                </Button>
                                
                                <Button
                                    onClick={() => signIn(undefined, { callbackUrl: '/' })}

                                    className="bg-blue-600 hover:bg-blue-800 font-bold"
                                >
                                    Iniciar Sesión
                                </Button>
                                
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

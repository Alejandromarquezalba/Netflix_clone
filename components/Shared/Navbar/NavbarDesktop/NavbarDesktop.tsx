'use client';
import { cn } from "@/lib/utils";
import { BellRing, Search } from "lucide-react";
import { MyLogo } from "../../MyLogo";
import { itemsNavbar } from "@/data/itemsNavbar";
import Link from "next/link";
import { scrollPositionFunc } from "@/hooks/scrollPosition";
import { useSession, signIn, signOut } from "next-auth/react";



export function NavbarDesktop() {
    const scrollPosition = scrollPositionFunc();
    console.log(scrollPosition);

    const { data: session, status } = useSession(); 

    const displayedNavItems = itemsNavbar.filter(item => {
        return !item.authRequired || status === 'authenticated';
    });


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
                        
                        {/* --- Lógica para mostrar nombre de usuario / botones de autenticación --- */}
                        {status === 'loading' && <p>Cargando...</p>} 
                        {status === 'authenticated' && session.user ? (
                            <>
                                <p>Hola, {session.user.name || session.user.email || 'Usuario'}
                                {/* para un supuesto unterfaz de admin, ej:{session.user.role === 'ADMIN' && (<span className="ml-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md">
                                        ADMIN</span>)}</p> */}</p> 
                                <button
                                    onClick={() => signOut()} 
                                    className="duration-300 hover:text-gray-400 transition-all cursor-pointer"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn(undefined, { callbackUrl: '/' })}
                                className="duration-300 hover:text-gray-400 transition-all cursor-pointer"
                            >
                                Iniciar Sesión
                            </button>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

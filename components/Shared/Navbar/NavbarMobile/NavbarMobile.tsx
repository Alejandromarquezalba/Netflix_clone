import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { MyLogo } from "../../MyLogo"
import { BellRing, Menu, Search } from "lucide-react"
import { itemsNavbar } from "@/data/itemsNavbar"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react";
import { useActiveProfile } from '@/contexts/ActiveProfileContext';

export function NavbarMobile() {
    const { data: session, status } = useSession();
    const { activeProfile } = useActiveProfile();

    // Filtra los ítems de la barra de navegación según la autenticación
    const displayedNavItems = itemsNavbar.filter(item => {
        return !item.authRequired || status === 'authenticated';
    });
    
    return (
        <div className="p-4 flex justify-between items-center bg-black">
            <MyLogo></MyLogo>

            <Sheet>
                <SheetTrigger>
                    <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black w-full sm:max-w-xs">
                    {/* Corrección del error de accesibilidad: SheetTitle es necesario */}
                    <SheetHeader>
                        <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                    </SheetHeader>
                    
                    <div className="flex flex-col gap-4 p-5">
                        {/* Renderizado de los enlaces de navegación según la sesión */}
                        {displayedNavItems.map((item) => (
                            <Link key={item.title} href={item.href} passHref>
                                <SheetClose className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
                                    {item.title}
                                </SheetClose>
                            </Link>
                        ))}
                    </div>

                    <div className="border-[1px] border-white/70 my-5"></div>

{/*-----------------Lógica de botones y estado del usuario */}
                    <div className="flex flex-col gap-4 px-7 mt-4">
                        {status === 'loading' && <p>Cargando...</p>}
                        {status === 'authenticated' && session.user ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <Search className="cursor-pointer" />
                                    <BellRing className="cursor-pointer" />
                                </div>
                                <div className="text-sm">
                                    <p>Hola, {session.user.name || session.user.email}</p>
                                    {activeProfile && (
                                        <p className="mt-1 px-2 py-1 rounded-md text-sm text-center">
                                            Perfil activo: {activeProfile.name}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="w-full py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
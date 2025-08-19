'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Profiles } from './components/Profiles';
import { Profile } from './components';


export default function ProfilesPage() {
    const { data: session } = useSession();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    

        useEffect(() => {
        console.log("1 - SESIÓN COMPLETA:", session);

        if (!session) {
            console.log("No hay sesión activa");
            return;
            }
            
            console.log("Sesión completa:", {
                id: session.user?.id, // ← Ahora debería existir
                token: session.accessToken // ← Y esto
            });


        if (!session?.user?.id) return;
            console.log("2 - TOKEN:", session.accessToken);
            console.log("3 - USER ID:", session.user.id);
        // Versión con axios (sí, es mejor que fetch)
        const loadProfiles = async () => {

            try {
            console.log("Cargando perfiles...");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`
                }
                }
            );
            setProfiles(response.data);
            } catch (error) {
            console.error("Error cargando perfiles:", error);
            }
        };

        const timer = setTimeout(loadProfiles, 100);
        return () => clearTimeout(timer);
        }, [session]);
        /*
        loadProfiles();
        }, [session]);
        */


        return (
        <div className='h-full flex flex-col justify-center items-center bg-zinc-900'>
            <h1 className='text-5xl mb-8'>Bienvenido, {session?.user?.name}</h1>
            <Profiles profiles={profiles} />
        </div>
        );
    }







/* viejo ProfilePages
export default function ProfilesPage() {
    const { data: session, status } = useSession();

    const [profiles, setProfiles] = useState<Profile[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {

            
            
            const fetchProfiles = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    });
                    setProfiles(response.data);
                } catch (error) {
                    console.error('Error al obtener perfiles:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfiles();
            



        }
    }, [status, session]);




    if (status === 'loading' || loading) {
        return <div>Cargando perfiles...</div>;
    }

    if (status === 'unauthenticated') {
        return <div>No estás logueado. Por favor, inicia sesión.</div>;
    }

    return (
        <div className='h-full flex flex-col justify-center items-center bg-zinc-900'>
            <div>
                <h1 className='text-5xl mb-8'>Bienvenido, {session?.user?.name}. Elegí tu perfil.</h1>
            </div>

            <Profiles profiles={profiles} />
        </div>
    );
}
*/

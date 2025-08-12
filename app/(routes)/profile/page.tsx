'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Profiles } from './components/Profiles';
import { Profile } from './components';


export default function ProfilesPage() {
    const { data: session, status } = useSession();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            console.log("Token being sent:", session?.accessToken); // 👈 Verifica esto
            console.log("API URL:", process.env.NEXT_PUBLIC_API_URL); // 👈 Verifica la URL

            console.log("Sesión completa:", session);

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


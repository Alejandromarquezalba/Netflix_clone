'use client';

import { profile } from 'console';
import { Profile, ProfileType } from '../Profiles.types';

import { useActiveProfile } from '@/contexts/ActiveProfileContext';
import { useRouter } from 'next/navigation';
import { Edit, Trash } from 'lucide-react';


import React from 'react';
interface ProfileCardProps {
    profile?: Profile | null;
    isAddNew?: boolean;
    isManaging: boolean;
    setIsCreating?: (value: boolean) => void; 
    handleDeleteProfile?: (id: string) => Promise<void>;
    handleEditProfile?: (profileToEdit: Profile) => void;
}


export default function ProfileCard({ 
    profile, 
    isAddNew = false, 
    isManaging,
    setIsCreating,
    handleDeleteProfile,
    handleEditProfile,
    }: ProfileCardProps) {

    const { setActiveProfile } = useActiveProfile();
    const router = useRouter();
    

    
    const handleSelect = () => {
        if (!profile) return;
        
        //cnviertimos null a undefined para el contexto
        const profileForContext: Profile = {
            ...profile,
            avatarUrl: profile.avatarUrl ?? undefined,
            pin: profile.pin ?? undefined,
            preferredLanguage: profile.preferredLanguage ?? undefined
            };
            
            setActiveProfile(profileForContext);
            localStorage.setItem('activeProfile', JSON.stringify(profileForContext));
            router.push('/'); 
        };
    
    //"Añadir nuevo"
    if (isAddNew) {
        return (
        <div className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer font-medium transition-all duration-150 hover:scale-105 hover:bg-white/4" onClick={() => setIsCreating?.(true)} >
            <p>+ Añadir perfil</p>
        </div>
        );
    }

    //por las dudaas si es perfil nulo/undefined
    if (!profile) {
        return (
        <div className="border p-4 rounded-lg bg-gray-100">
            <p>Perfil no disponible</p>
        </div>
        );
    }




    // Avatar seguro (maneja null/undefined)
    const avatarSrc = profile.avatarUrl 
        ? profile.avatarUrl 
        : '/default-avatar.png'; // Ruta local o URL por defecto

    return (
        <div
            className={`
                relative border p-4 rounded-lg cursor-pointer font-medium 
                transition-all duration-150 backdrop-blur-sm 
                ${!isManaging && 'hover:bg-white/4 hover:scale-105'}
            `}
            onClick={isManaging ? undefined : handleSelect}
        >
            
            {isManaging && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {/*Editar */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditProfile?.(profile as Profile);
                        }}
                        className="bg-blue-500 text-white p-1 rounded-full text-xs hover:scale-115 transition-all duration-200">
                        <Edit size={30} />
                    </button>


                    {/*liminar */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProfile?.(profile?.id as string);
                        }}
                        className="bg-red-500 text-white p-1 rounded-full text-xs hover:scale-115 transition-all duration-200"
                    >
                        <Trash size={30} />
                    </button>
                </div>
                )}


            <h3 className="font-bold text-lg">{profile.name}</h3>

            <p className="text-sm text-gray-600">Tipo: {profile.type === 'ADULT' ? 'Adulto' : 'Infantil'}</p>

            <div //AQUI IRIA LA IMG, div con fondo de color nomas a modo de ejemplo, abajo esta la IMG comentada
            className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mt-2 mb-10"
            >
            {profile.name.charAt(0).toUpperCase()}
            </div>
        
        </div>
    );
}

/*
<img 
            src={avatarSrc} 
            alt={profile.name}
            className="w-16 h-16 rounded-full mt-2"
            onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
            }}
        />
*/
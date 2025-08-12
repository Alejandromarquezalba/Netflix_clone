'use client';

import { profile } from 'console';
import { Profile, ProfileType } from '../Profiles.types';
import { Edit3, Plus, Trash2 } from 'lucide-react';


import React from 'react';


interface ProfileCardProps {
    profile?: Profile; 
    isAddNew?: boolean;
    isManaging?: boolean;
}

/*
const profileColors = ['#A855F7', '#EC4899', '#3B82F6', '#10B981'];

export default function ProfileCard({ profile, isAddNew, isManaging }: ProfileCardProps) {
    
    
    //manejamos el caso de "Agregar nuevo perfil"
    if (isAddNew) {
        return (
        <div className="group cursor-pointer">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-dashed border-gray-600 hover:border-gray-400 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
            <Plus className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-center text-gray-300 group-hover:text-white font-medium transition-colors">
            Agregar Perfil
            </p>
        </div>
        );
    }
        if (!profile) {

            return null;
        }
        const profileColor = profile?.color || profileColors[profile?.id.charCodeAt(0) % profileColors.length] || profileColors[0];

    return (
        <div className="group cursor-pointer relative">
        <div
            className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden ring-4 ring-transparent group-hover:ring-white/30 transition-all duration-300 group-hover:scale-105"
            style={{ '--profile-color': profileColor } as React.CSSProperties}
        >
            <img
            src={profile?.avatarUrl || 'https://images.unsplash.com/photo-1596495333159-e91008a0d92b?w=150&h=150&fit=crop&crop=face'}
            alt={profile?.name}
            className="w-full h-full object-cover"
            />
            <div
            className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-300"
            style={{ background: `linear-gradient(135deg, ${profileColor}40, ${profileColor}80)` }}
            />
            {profile?.type === ProfileType.CHILD && (
            <div className="absolute top-2 right-2 bg-orange-500/80 text-white text-xs px-2 py-1 rounded-full font-bold">
                KIDS
            </div>
            )}

            {isManaging && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-2">
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Edit3 className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors">
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
                </div>
            </div>
            )}
        </div>
        <div className="text-center">
            <h3 className="text-white font-semibold text-lg group-hover:text-gray-200 transition-colors">
            {profile?.name}
            </h3>
            <div
            className="w-12 h-1 mx-auto mt-2 rounded-full transition-all duration-300 group-hover:w-16"
            style={{ backgroundColor: profileColor }}
            />
        </div>
        </div>
    );
}
*/


interface ProfileCardProps {
    profile?: Profile; 
    isAddNew?: boolean;
    isManaging?: boolean;
}


export default function ProfileCard({ 
    profile, 
    isAddNew = false, 
    isManaging = false 
    }: ProfileCardProps) {
    
    // Modo "Añadir nuevo"
    if (isAddNew) {
        return (
        <div className="border-2 border-dashed p-4 rounded-lg text-center">
            <p>+ Añadir perfil</p>
        </div>
        );
    }

    // Perfil nulo/undefined
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
        <div className="border p-4 rounded-lg">
        <h3 className="font-bold">{profile.name}</h3>
        <p>Tipo: {profile.type}</p>
        <img 
            src={avatarSrc} 
            alt={profile.name}
            className="w-16 h-16 rounded-full mt-2"
            onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-avatar.png';
            }}
        />
        </div>
    );
}
'use client';

import { Profile } from './Profiles.types';

import { Plus, Edit3, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProfileCard from './ProfileCard/Profilecard';


export function Profiles({ profiles }: { profiles: Profile[] }) {
    const [isManaging, setIsManaging] = useState(false);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                {profiles.map((profile) => (
                    <ProfileCard 
                        key={profile.id}
                        profile={profile} // <-- Acepta Profile completo
                        isManaging={isManaging}
                    />
                    ))}
                    {!isManaging && profiles.length < 5 && (
                    <ProfileCard isAddNew />
                    )}
            </div>

            {/* ... (el resto del código de botones de administrar) ... */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => setIsManaging(!isManaging)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                    <Edit3 className="w-5 h-5" />
                    {isManaging ? 'Terminar' : 'Administrar Perfiles'}
                </button>
            </div>
        </div>
    );
}

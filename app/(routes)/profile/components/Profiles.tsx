'use client';

import { Profile } from './Profiles.types';

import { Plus, Edit3, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProfileCard from './ProfileCard/Profilecard';
import Link from 'next/link';

interface ProfilesProps {
    profiles: Profile[];
    isManaging: boolean;
    setIsCreating: (value: boolean) => void;
    handleDeleteProfile: (id: string) => Promise<void>;
    handleEditProfile: (profileToEdit: Profile) => void; 
}

export function Profiles({ profiles, isManaging, setIsCreating, handleDeleteProfile, handleEditProfile }: ProfilesProps) {

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                {profiles.map((profile) => (
                <ProfileCard 
                    key={profile.id}
                    profile={profile}
                    isManaging={isManaging}
                    setIsCreating={setIsCreating}
                    handleDeleteProfile={handleDeleteProfile}
                    handleEditProfile={handleEditProfile} 
                />
                ))}
                {profiles.length < 5 && (
                <ProfileCard 
                    isAddNew 
                    isManaging={isManaging} 
                    
                    setIsCreating={setIsCreating}
                />
                )}
            </div>

            <div className="flex justify-center space-x-4">
            
            </div>
        </div>
    );
}

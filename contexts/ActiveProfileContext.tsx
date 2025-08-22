'use client';

import { createContext, useContext, useState } from 'react';
import { ProfileType } from '@/app/(routes)/profile/components';
import { Profile } from '@/app/(routes)/profile/components';



    interface ActiveProfileContextType {
    activeProfile: Profile | null;
    setActiveProfile: (profile: Profile | null) => void;
    }

    const ActiveProfileContext = createContext<ActiveProfileContextType | undefined>(undefined);

    // Exporta el provider y hook
    export function ActiveProfileProvider({ children }: { children: React.ReactNode }) {
    const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
    
    return (
        <ActiveProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
        {children}
        </ActiveProfileContext.Provider>
    );
    }

    export function useActiveProfile() {
    const context = useContext(ActiveProfileContext);
    if (!context) throw new Error('Must be used within ActiveProfileProvider');
    return context;
    }
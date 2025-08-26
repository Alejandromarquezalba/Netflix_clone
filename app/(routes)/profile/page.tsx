'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Profiles } from './components/Profiles';
import { Profile } from './components';
import { Edit3 } from 'lucide-react'; 
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function ProfilesPage() {
    const { data: session } = useSession();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isManaging, setIsManaging] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');

    const router = useRouter();

    const [newProfileType, setNewProfileType] = useState('ADULT'); 
    const [newProfileAutoPlay, setNewProfileAutoPlay] = useState(true);
    const [newProfilePin, setNewProfilePin] = useState('');

    const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

    const [newProfileAgeRestriction, setNewProfileAgeRestriction] = useState('ALL');


    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);



    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) {
            alert('El nombre del perfil no puede estar vacío.');
            return;
        }

        try {
            //campos que van pal back
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                {
                    name: newProfileName,
                    type: newProfileType, 
                    ageRestriction: newProfileAgeRestriction, 
                    autoPlay: newProfileAutoPlay, 
                    pin: newProfilePin || null, 
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );

            setProfiles([...profiles, response.data]);
            setNewProfileName('');
            setIsCreating(false);
            setIsManaging(false);

        } catch (error) {
            console.error('Error al crear el perfil:', error);
            alert('Error al crear el perfil. Inténtalo de nuevo.');
        }
    };
    
    const handleSaveProfile = async () => {
        if (!newProfileName.trim()) {
            alert('El nombre del perfil no puede estar vacío.');
            return;
        }

        const profileData = {
            name: newProfileName,
            type: newProfileType, 
            ageRestriction: newProfileAgeRestriction, 
            autoPlay: newProfileAutoPlay, 
            pin: newProfilePin || null, 
        };

        try {
            if (editingProfileId) {
                //si hay un id es una edicion patch con mi back
                const response = await axios.patch(
                    `${process.env.NEXT_PUBLIC_API_URL}/profile/${editingProfileId}`,
                    profileData,
                    { headers: { Authorization: `Bearer ${session?.accessToken}` } }
                );
                //actualiza la lista de perfiles
                setProfiles(profiles.map(p => (p.id === editingProfileId ? response.data : p)));
            } else {
                // Si no hay ID, es una CREACIÓN (POST)
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                    profileData,
                    { headers: { Authorization: `Bearer ${session?.accessToken}` } }
                );
                //agrega nuevo perfil
                setProfiles([...profiles, response.data]);
            }

            //restablece los estados del formulario después de guardar
            setEditingProfileId(null);
            setNewProfileName('');
            setNewProfileType('ADULT'); 
            setNewProfileAgeRestriction('ALL');
            setNewProfileAutoPlay(true);
            setNewProfilePin('');
            setIsCreating(false);
            setIsManaging(false);

        } catch (error) {
            console.error('Error al guardar el perfil:', error);
            alert('Error al guardar el perfil. Inténtalo de nuevo.');
        }
    };

    const handleEditProfile = (profileToEdit: Profile) => {
        setEditingProfileId(profileToEdit.id); //guarda el ID para saber que estoy editando
        setNewProfileName(profileToEdit.name); //rellena los campos del formulario con la info del perfil
        setNewProfileType(profileToEdit.type); // Aquí para llenar el campo de restricción de edad
        setNewProfileAgeRestriction(profileToEdit.ageRestriction); 
        setNewProfileAutoPlay(profileToEdit.autoPlay);
        setNewProfilePin(profileToEdit.pin || '');
        setIsCreating(true); //abrrir el modal
    };

    const handleDeleteProfile = async (profileId: string) => {
        try {
            if (window.confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/profile/${profileId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
    
                // 1. Actualiza la lista de perfiles
                setProfiles(profiles.filter(p => p.id !== profileId));
                
                // 2. Limpia el estado si el perfil eliminado es el perfil actual
                if (currentProfile && currentProfile.id === profileId) {
                    setCurrentProfile(null);
                    // Si usas localStorage para guardar el perfil, también debes limpiarlo.
                    localStorage.removeItem('currentProfile');
                }
            }
        } catch (error) {
            console.error('Error al eliminar el perfil:', error);
            alert('Error al eliminar el perfil. Inténtalo de nuevo.');
        }
    };
    


    useEffect(() => {
        // Si la sesión no existe, no hagas nada
        if (!session) {
            console.log("No hay sesión activa");
            return;
        }
        
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
                setIsLoading(false);
            } catch (error) {
                console.error("Error cargando perfiles:", error);
                setIsLoading(false);
            }
        };
    
        //llamado de función de carga de perfiles directamente
        loadProfiles();
    
    }, [session]);


    return (
        <div className='h-full flex flex-col justify-center items-center bg-zinc-900 text-white'>
            <h1 className='text-5xl mb-8'>¿Quién está viendo ahora?</h1>
            
            <Profiles 
                profiles={profiles} 
                isManaging={isManaging} 
                setIsCreating={setIsCreating} 
                handleDeleteProfile={handleDeleteProfile}
                handleEditProfile={handleEditProfile} 
            />
            
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-700">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProfileId ? 'Editar Perfil' : 'Añadir nuevo perfil'}
                        </DialogTitle>
                        <DialogDescription>
                            Completa los campos para {editingProfileId ? 'editar' : 'crear'} este perfil.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Nombre</Label>
                            <Input
                                id="name"
                                value={newProfileName}
                                onChange={(e) => setNewProfileName(e.target.value)}
                                className="col-span-3 bg-zinc-800 text-white placeholder-zinc-500 border-zinc-700"
                            />
                        </div>


                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Tipo</Label>
                            <Select onValueChange={setNewProfileType} defaultValue={newProfileType}>
                                <SelectTrigger className="col-span-3 bg-zinc-800 text-white border-zinc-700">
                                    <SelectValue placeholder="Selecciona un tipo" className="text-zinc-500" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 text-white">
                                    <SelectItem value="ADULT">Adulto</SelectItem>
                                    <SelectItem value="CHILD">Infantil</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>



                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ageRestriction" className="text-right">Restricción de edad</Label>
                            <Select onValueChange={setNewProfileAgeRestriction} defaultValue={newProfileAgeRestriction}>
                                <SelectTrigger className="col-span-3 bg-zinc-800 text-white border-zinc-700">
                                    <SelectValue placeholder="Selecciona una restricción" className="text-zinc-500" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 text-white">
                                    <SelectItem value="ALL">Para todos</SelectItem>
                                    <SelectItem value="KIDS">Para niños</SelectItem>
                                    <SelectItem value="TEEN">Para adolescentes</SelectItem>
                                    <SelectItem value="MATURE">Para adultos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="autoplay" className="text-right">Auto-reproducir</Label>
                            <Checkbox
                                id="autoplay"
                                checked={newProfileAutoPlay}
                                onCheckedChange={(checked) => setNewProfileAutoPlay(!!checked)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pin" className="text-right">PIN</Label>
                            <Input
                                id="pin"
                                type="password"
                                value={newProfilePin}
                                onChange={(e) => setNewProfilePin(e.target.value)}
                                className="col-span-3 bg-zinc-800 text-white placeholder-zinc-500 border-zinc-700"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSaveProfile} // Ahora llama a la nueva función
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex justify-center space-x-4">
                
                <button
                    onClick={() => router.push('/')} // <-- ¡CAMBIA ESTA LÍNEA!
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-200 hover:scale-105 backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                        Volver al inicio
                </button>
                    

                <button
                    onClick={() => setIsManaging(!isManaging)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                    <Edit3 className="w-5 h-5" />
                    {isManaging ? 'No Administrar' : 'Administrar Perfiles'}
                </button>
            </div>
        </div>
    );
    }




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




export default function ProfilesPage() {
    const { data: session } = useSession();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isManaging, setIsManaging] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');


    const [newProfileType, setNewProfileType] = useState('ADULT'); 
    const [newProfileAutoPlay, setNewProfileAutoPlay] = useState(true);
    const [newProfilePin, setNewProfilePin] = useState('');



    const [newProfileAgeRestriction, setNewProfileAgeRestriction] = useState('ALL');



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
    
    const handleDeleteProfile = async (profileId: string) => {
        try {
            if (window.confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/profiles/${profileId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                        },
                    }
                );
                
                setProfiles(profiles.filter(p => p.id !== profileId));
            }
        } catch (error) {
            console.error('Error al eliminar el perfil:', error);
            alert('Error al eliminar el perfil. Inténtalo de nuevo.');
        }
    };


    useEffect(() => {

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
            } catch (error) {
                console.error("Error cargando perfiles:", error);
            }
        };

        const timer = setTimeout(loadProfiles, 100);
        return () => clearTimeout(timer);
    }, [session]);


        return (
            <div className='h-full flex flex-col justify-center items-center bg-zinc-900 text-white'>
                <h1 className='text-5xl mb-8'>¿Quién está viendo ahora?</h1>
                
                <Profiles profiles={profiles} isManaging={isManaging} setIsCreating={setIsCreating} handleDeleteProfile={handleDeleteProfile}/>
                

            {/* edicion de perfil  Inicio*/}
                <Dialog open={isCreating} onOpenChange={setIsCreating}>

                    <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-700">
                        <DialogHeader>
                            <DialogTitle>Añadir nuevo perfil</DialogTitle>
                            <DialogDescription>
                                Completa los campos para crear un nuevo perfil.
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
                                onClick={handleCreateProfile}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Guardar
                            </Button>
                        </DialogFooter>


                    </DialogContent>
                </Dialog>
            {/* edicion de perfil  fin*/}
    

                <div className="flex justify-center gap-4 mt-8">

                    <Link href="/">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                            Volver al inicio
                        </button>
                    </Link>

                    <button
                        onClick={() => setIsManaging(!isManaging)}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                    >
                        <Edit3 className="w-5 h-5" />
                        {isManaging ? 'Terminar' : 'Administrar Perfiles'}
                    </button>
                </div>
            </div>
        );
    }




'use client';


import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Movie {
    id: string;
    title: string;
    description?: string | null;
    duration?: number | null;
    releaseYear: number;
    coverUrl: string;
    addedAt: string;
    genres: string[]; 
    videoMetadata?: any; 
    watchedBy?: any[]; 
    watchlist?: any[]; 
    }



    export default function HeroBanner() {
    const { data: session } = useSession();
    const router = useRouter();


    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);





    const handleMovieClick = (movieId: string) => {
        if (!session) {
        router.push('/login');
        return;
        }

        router.push(`/movies/${movieId}`);
    };




    const handlePlayClick = (movieId: string) => {
        if (!session) {
        alert('Debes iniciar sesión para reproducir películas');
        router.push('/login');
        return;
        }
        //logica iria aqui pa'la reproduccion de la peli
        console.log('Reproduciendo película:', movieId);
    };
    



    const fetchMovies = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/movies`,
                {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                }
            );
            
            setMovies(response.data);
            } catch (err: any) {
            console.error("Error al cargar las películas:", err);
            setError("Error al cargar las películas");
            } finally {
            setIsLoading(false);
            }
        };
        
        useEffect(() => {
            fetchMovies();
        }, [session]);
        

        if (isLoading) {
            return (
                <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                    <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Cargando películas...</p>
                    </div>
                </div>
                );
            }
            
            if (error) {
                return (
                <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                    <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-red-500 text-xl mb-6">{error}</p>
                    <button
                        onClick={fetchMovies}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                    >
                        Reintentar
                    </button>
                    </div>
                </div>
                );
            }


            if (isLoading) {
                return (
                    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                        <div className="text-center">
                        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white">Cargando películas...</p>
                        </div>
                    </div>
                    );
                }
                
                if (error) {
                    return (
                    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
                        <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <p className="text-red-500 text-xl mb-6">{error}</p>
                        <button
                            onClick={fetchMovies}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                        >
                            Reintentar
                        </button>
                        </div>
                    </div>
                    );
                }

    const moviesTrending = movies.slice(0, 6);
    const moviesRecomendadas = movies.slice(6, 12);
    const moviesTodas = movies;

    
    return (
        <div className="space-y-8 p-8">
{/*---------Tendencias */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Tendencias</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {moviesTrending.map((movie) => (
                            <Card 
                            key={movie.id} 
                            className="cursor-pointer hover:scale-105 transition-transform bg-gray-900 border-gray-800"
                            onClick={() => handleMovieClick(movie.id)}
                            >
                            <CardContent className="p-0">
                                <img 
                                src={movie.coverUrl} 
                                alt={movie.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-3">
                                <h3 className="font-semibold text-sm truncate text-white">{movie.title}</h3>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </section>
{/*-----------------Recomendadas */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Recomendadas para ti</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {moviesRecomendadas.slice(0, 6).map((movie) => (
                            <Card 
                            key={movie.id} 
                            className="cursor-pointer hover:scale-105 transition-transform bg-gray-900 border-gray-800"
                            onClick={() => handleMovieClick(movie.id)}
                            >
                            <CardContent className="p-0">
                                <img 
                                    src={movie.coverUrl} 
                                    alt={movie.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm truncate text-white">{movie.title}</h3>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </section>

{/*-----------------Película destacada (Hero principal) */}
                    {moviesTrending[0] && (
                        <section className="relative h-[80vh] rounded-lg overflow-hidden">
                        <img 
                            src={moviesTrending[0].coverUrl} 
                            alt={moviesTrending[0].title}

                            className="w-full h-full object-cover bg-black"
//--------------------------className="w-full h-full object-cover" para que no se vea todo oscuro era asi, con bg-black para ver donde iria la peli
                        />


                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8"> 

                            <h1 className="text-4xl font-bold text-white mb-4">
                            {moviesTrending[0].title}
                            </h1>
                            <p className="text-gray-300 mb-6 max-w-2xl">
                            {moviesTrending[0].description}
                            </p>
                            <div className="flex gap-4">
                            <Button 
                                onClick={() => handlePlayClick(moviesTrending[0].id)}
                                className="bg-white text-black hover:bg-gray-200 font-medium"
                            >
                                <Play className="mr-2" size={16} />
                                Reproducir
                            </Button>
                            <Button 
                                onClick={() => handleMovieClick(moviesTrending[0].id)}
                                variant="outline"
                                className="bg-gray-800/60 text-white border-white hover:bg-gray-700 font-medium"
                            >
                                <Info className="mr-2" size={16} />
                                Más información
                            </Button>
                            </div>
                        </div>
                        </section>
                    )}

{/* Todas las películas */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">Todas las películas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {moviesTodas.slice(0, 12).map((movie) => (
                            <Card 
                            key={movie.id} 
                            className="cursor-pointer hover:scale-105 transition-transform bg-gray-900 border-gray-800"
                            onClick={() => handleMovieClick(movie.id)}
                            >
                            <CardContent className="p-0">
                                <img 
                                src={movie.coverUrl} 
                                alt={movie.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-3">
                                <h3 className="font-semibold text-sm truncate text-white">{movie.title}</h3>
                                <p className="text-gray-500 text-xs">{movie.genres.join(', ')}</p>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                        </div>
                    </section>
                    </div>
                );
}
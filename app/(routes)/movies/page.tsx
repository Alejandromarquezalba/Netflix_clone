
'use client';

import { useState, useEffect } from 'react';
import { Play, Info, Star, Calendar, Clock, Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { string } from 'zod';
import axios from 'axios';
import { useFavorites } from '@/hooks/useFavorites';

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


export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { data: session } = useSession(); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { favorites, toggleFavorite, isFavorite } = useFavorites();



    const fetchMovies = async (query?: string) => {


        try {
            setIsLoading(true);
            setError(null);
            
            const url = query && query.length > 0 
                ? `${process.env.NEXT_PUBLIC_API_URL}/movies?query=${encodeURIComponent(query)}` //encodeUri es para evitar caracteres especiales qel usuario ponga
                : `${process.env.NEXT_PUBLIC_API_URL}/movies`;
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            
            setMovies(response.data);
        } catch (err: any) {
            console.error("Error al cargar las películas:", err);
            
//errores específicos
            if (err.response?.status === 500) {
                setError("Error del servidor. Por favor, intenta nuevamente.");
                } else if (err.code === 'ECONNABORTED') {
                setError("Tiempo de espera agotado. Verifica tu conexión.");
                } else if (err.response?.status === 401) {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                } else {
                setError("Error al cargar las películas. Por favor, inténtalo de nuevo.");
                }
            } finally {
                setIsLoading(false);
            }
    };

    //useEffect para la carga INICIAL de pelis y favorits
    useEffect(() => {
        if (session) {
            fetchMovies();
            
        }
    }, [session]); //depende de la sesión para asegurarse de que el token esté disponible
    
//--useEffect para manejar la búsqueda con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.length === 0) {
                fetchMovies();
            } else if (searchQuery.length > 2) {
                fetchMovies(searchQuery);
            }
        }, 500); 
    
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);


//--función para obtener color del género
    const getGenreColor = (genre: string) => {
        const colors: { [key: string]: string } = {
        ACTION: 'bg-red-600',
        COMEDY: 'bg-yellow-600',
        DOCUMENTARY: 'bg-blue-600'
        };
        return colors[genre] || 'bg-gray-600';
    };

    //función para formatear duración
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const handleFavoriteClick = (movieId: string) => {
        if (!session) {
            alert("Debes iniciar sesión para agregar favoritos.");
            return;
        }
        toggleFavorite(movieId); 
    };


    const filteredMovies = 
        selectedGenre === 'ALL' 
            ? movies 
            : selectedGenre === 'FAVORITES'  
            ? movies.filter(movie => isFavorite(movie.id))  
            : movies.filter(movie => movie.genres.includes(selectedGenre));
    if (isLoading) {
        return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl">Cargando películas...</p>
            </div>
        </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-500 text-xl mb-6">{error}</p>
{/*-------------Boton reintentar*/}
                <button
                    onClick={() => {
                    setError(null); 
                    fetchMovies(searchQuery);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
                >
                    Volver a buscar
                </button>
{/*------------Opción para volver al inicio */}
                <div className="mt-4">
                    <button
                    onClick={() => {
                        setError(null);
                        setSearchQuery('');
                        fetchMovies();
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                    >
                    o volver a todas las películas
                    </button>
                </div>
                </div>
            </div>
            );
        }

    
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-black text-white overflow-x-hidden">

            <style jsx global>{`
                html {
                overflow-y: scroll;
                }
            `}</style>

{/*---------hero/princila Seccion o mas vistosa */}
            <div className="relative h-96 bg-gradient-to-r from-red-900 to-black mb-8">
                
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-white bg-clip-text">
                            Movies
                            </h1>
                            <p className="text-xl text-gray-300">Descubre tu próxima película favorita</p>
                        </div>
                    </div>
            </div>
        
            <div className="container mx-auto px-6">
{/*-------------buscado*/}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar películas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 pr-10" // Añadido pr-10 para el padding
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {searchQuery ? (
                            // Mostrar la X cuando hay texto
                            <button
                                onClick={() => setSearchQuery('')}
                                className="p-1 text-gray-400 hover:text-white focus:outline-none"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ) : (
                            // Mostrar la lupa cuando no hay texto
                            <span>🔍</span>
                        )}
                    </div>
                </div>
            </div>
        
{/*-------------botones de filtro*/}
                <div className="flex justify-center space-x-4 mb-8">
                {['ALL', 'ACTION', 'COMEDY', 'DOCUMENTARY', 'FAVORITES'].map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                            selectedGenre === genre
                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                        >
                        {genre === 'ALL' ? 'Todas' : genre === 'FAVORITES' ? 'Mis Favoritas' : genre.charAt(0) + genre.slice(1).toLowerCase()}
                    </button>
                ))}
                </div>
        
{/*-------------grdi de pelis*/}
                {filteredMovies.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-gray-500 text-6xl mb-4">🎬</div>
                    <p className="text-gray-400 text-xl">No hay películas para mostrar</p>
                </div>
                ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 pb-12">
                    {filteredMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className="group relative transform transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredMovie(movie.id)}
                        onMouseLeave={() => setHoveredMovie(null)}
                    >
{/*---------------------card de peli*/}
                        <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gray-900">
                            
{/*---------------------poster de peli*/}
                        <div className="aspect-[2/3] relative overflow-hidden">
                            <img
                            src={movie.coverUrl && movie.coverUrl !== 'N/A' ? movie.coverUrl : ''}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                                //plan b/fallback para img que no cargan'
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.classList.remove('hidden');
                            }}
                            />
{/*-------------------------falllback del background*/}
                            <div className="hidden absolute inset-0 bg-gradient-to-br from-red-900 via-purple-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center p-4">
                                <div className="text-4xl mb-2">🎬</div>
                                <p className="text-sm font-semibold text-center leading-tight">{movie.title}</p>
                                <p className="text-xs text-gray-300 mt-1">{movie.releaseYear}</p>
                            </div>
                            </div>
                            
{/*-------------------------info al pasar cursor*/}
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex space-x-3">
                                <button className="p-3 bg-red-600 rounded-full hover:bg-red-400 transition-colors">
                                    <Play size={20} fill="white" />
                                </button>

                                <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                                    <Info size={20} />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteClick(movie.id);
                                        console.log("🖱️ Click en corazón - Movie ID:", movie.id);
                                    }}
                                    className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                                    >
                                    <Heart 
                                        size={20} 
                                        fill={isFavorite(movie.id) ? "red" : "none"}  
                                        stroke={isFavorite(movie.id) ? "red" : "white"} 
                                    />
                                </button>
                            </div>
                            </div>
        
{/*-------------------------genero etiqueta */}
                            <div className="absolute top-2 left-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getGenreColor(movie.genres[0])}`}>
                                    {movie.genres[0]}
                                </span>
                            </div>
        
{/*-------------------------rating etiqueta - usando videoMetadata si existe*/}
                            <div className="absolute top-2 right-2 bg-black bg-opacity-80 rounded px-2 py-1">
                            <div className="flex items-center space-x-1">
                                <Star size={12} className="text-yellow-500" fill="currentColor" />
                                <span className="text-xs">
                                {movie.videoMetadata?.rating && movie.videoMetadata.rating !== 'N/A' 
                                    ? movie.videoMetadata.rating 
                                    : (Math.random() * 2 + 7).toFixed(1)
                                }
                                </span>
                            </div>
                            </div>
                        </div>
        
{/*---------------------innfo de la pel*/}
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                            {movie.title}
                            </h3>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                            <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{movie.releaseYear}</span>
                            </div>
                            {movie.duration && (
                                <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{formatDuration(movie.duration)}</span>
                                </div>
                            )}
                            </div>
        
                            <div className="h-12 overflow-hidden">
                            {movie.description && hoveredMovie === movie.id ? (
                                <p className="text-sm text-gray-300 line-clamp-3 transition-opacity duration-300">
                                {movie.description}
                                </p>
                            ) : (
                                <div className="h-12"></div>
                            )}
                            </div>

                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        );
}
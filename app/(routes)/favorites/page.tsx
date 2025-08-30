'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';


interface Movie {
    id: string;
    title: string;
    description?: string;
    duration?: number;
    releaseYear: number;
    coverUrl: string;
    genres: string[];
    }

    export default function FavoritesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorites = async () => {
        if (!session) {
            setIsLoading(false);
            setError("Necesitas iniciar sesión para ver tus favoritos.");
            return;
        }
        try {
            const response = await axios.get<Movie[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/movies/watchlist`,
            {
                headers: {
                Authorization: `Bearer ${session.accessToken}`,
                },
            }
            );
            setFavorites(response.data);
        } catch (err) {
            console.error("Error al cargar la lista de favoritos:", err);
            setError("Hubo un problema al cargar tu lista de favoritos.");
        } finally {
            setIsLoading(false);
        }
        };
        fetchFavorites();
    }, [session]);

    const handleRemove = async (movieId: string) => {
        if (!session) return;
        try {

        await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}/watchlist`,
            {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
            }
        );
        // Actualiza el estado para eliminar la película de la UI
        setFavorites(favorites.filter(movie => movie.id !== movieId));
        } catch (err) {
        console.error("Error al eliminar de favoritos:", err);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    if (isLoading) {
        return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <p>Cargando tu lista de favoritos...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
            <p>{error}</p>
        </div>
        );
    }

    if (favorites.length === 0) {
        return (
        <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
            <p>Aún no tienes películas en tu lista de favoritos.</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
                <img src={movie.coverUrl} alt={movie.title} className="w-full h-auto rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                <div className="text-center">
                    <h3 className="text-sm font-semibold mb-2">{movie.title}</h3>
                    <button
                    onClick={() => handleRemove(movie.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-bold"
                    >
                    Quitar
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

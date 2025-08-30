'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export function useFavorites() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (session?.user?.id) {
            const storageKey = `favorites_${session.user.id}`;
            const cachedFavorites = localStorage.getItem(storageKey);
            if (cachedFavorites) {
                setFavorites(JSON.parse(cachedFavorites));
            }
            // La sincronización con backend sigue en loadFavorites
        }
    }, [session]);
    
    const loadFavorites = useCallback(async () => {
        if (!session?.user?.id) {
            setFavorites([]);
            return;
        }

        const storageKey = `favorites_${session.user.id}`;
        
        // NO sobreescribir el estado aquí, solo sincronizar en segundo plano
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/movies/watchlist`,
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            
            // Solo actualizar si el backend devuelve datos válidos
            if (Array.isArray(response.data)) {
                setFavorites(response.data);
                localStorage.setItem(storageKey, JSON.stringify(response.data));
            }
            
        } catch (error) {
            console.error('Error loading favorites:', error);
            // Mantener los datos existentes en caso de error
        } finally {
            setIsLoading(false);
        }
    }, [session]);


    const toggleFavorite = useCallback(async (movieId: string) => {
        if (!session?.user?.id) return;

        const storageKey = `favorites_${session.user.id}`;
        const wasFavorite = favorites.includes(movieId);
        const previousFavorites = [...favorites];

        // Optimistic UI
        const newFavorites = wasFavorite
            ? favorites.filter(id => id !== movieId)
            : [...favorites, movieId];

        setFavorites(newFavorites);
        localStorage.setItem(storageKey, JSON.stringify(newFavorites));

        try {
            if (wasFavorite) {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}/watchlist`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}/watchlist`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    }
                );
            }

            // Sincronizar con backend después del cambio
            await loadFavorites();

        } catch (error) {
            // Revertir en caso de error
            setFavorites(previousFavorites);
            localStorage.setItem(storageKey, JSON.stringify(previousFavorites));
            console.error('Error updating favorite:', error);
        }
    }, [session, favorites, loadFavorites]);

    // Sincronizar al montar el componente
    useEffect(() => {
        if (session) {
            loadFavorites();
        }
    }, [session, loadFavorites]);

    return {
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite: (movieId: string) => favorites.includes(movieId),
        refreshFavorites: loadFavorites,
    };
}
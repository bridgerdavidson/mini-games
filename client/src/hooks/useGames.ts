import { useState, useEffect } from 'react';
import { getGames } from '../services/games';
import type { Game } from '../types/Game';

export function useGames() {
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        getGames().then(setGames).catch(console.error);
    }, []);
    return games;
}
import type { Game } from '../types/Game';

const BASE_URL = "/api/games";

export async function getGames(): Promise<Game[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
        throw new Error(`Could not fetch games (${res.status})`);
    }
    return res.json();
}
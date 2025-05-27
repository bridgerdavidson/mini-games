export interface Card {
    id: number;
    pairId: number;
    flipped: boolean;
    matched: boolean;
    content: string;
}

export type Board = Card[];
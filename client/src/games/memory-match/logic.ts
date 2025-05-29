import type { Card, Board } from './types';

export function generateCardsAndBoard(numOfPairs: number, contents: string[]): Board {
    const board: Card[] = [];
    let cardId = 0;
    // Generate pairs of cards and put them in the deck
    for (let pairId = 0; pairId < numOfPairs; pairId++) {
        const value = contents[pairId];
        board.push({id: cardId++, pairId: pairId, flipped: false, matched: false, content: value});
        board.push({id: cardId++, pairId: pairId, flipped: false, matched: false, content: value});
    }

    // Shuffle the board - fisher yates shuffle
    for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }

  return board;
}

export function checkMatch(board: Board, firstCardId: number, secondCardId: number) : Board {
    const firstCard = board.find(c => c.id === firstCardId)!;
    const secondCard = board.find(c => c.id === secondCardId)!;
    if (firstCard.pairId === secondCard.pairId) {
    return board.map(c =>
      c.pairId === firstCard.pairId ? { ...c, matched: true } : c
    );
  }
  return board;
}
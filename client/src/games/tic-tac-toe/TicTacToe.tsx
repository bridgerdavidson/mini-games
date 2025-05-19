import React from "react";
import "./TicTacToe.css";
import { useState } from "react";
import type { Board, Player } from "./types";
import { getWinner, isDraw } from "./logic";

function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const handleCellClick = (idx: number) => {
    if (board[idx] || getWinner(board)) {
      return; // Cell is already filled or the game is over
    } else {
      const newBoard = [...board];
      newBoard[idx] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const winner = getWinner(board);
  const draw = !winner && isDraw(board);

  return (
    <div className="ttt">
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : draw
          ? "Draw!"
          : `Next: ${currentPlayer}`}
      </div>
      <div className="grid">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleCellClick(i)}>
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer("X");
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default TicTacToe;

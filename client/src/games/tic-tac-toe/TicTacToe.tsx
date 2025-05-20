import React from "react";
import "./TicTacToe.css";
import { useState } from "react";
import type { Board, Player } from "./types";
import { getWinner, isDraw } from "./logic";
import { FaDotCircle } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";

function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [hoveredIndex, setHoveredIdx] = useState<number | null>(null);

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

  function getPlayerIcon(player: Player | null) {
    if (player === "X") return <TiTimes size={90} />;
    if (player === "O") return <FaDotCircle size={48} />;
    return null;
  }

  const winner = getWinner(board);
  const draw = !winner && isDraw(board);

  return (
    <div className="ttt">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-area">
        {/* Left “X” label */}
        <div className={`side-icon ${currentPlayer === "X" ? "active" : ""}`}>
          {getPlayerIcon("X")}
        </div>
        {/* Your actual board */}
        <div className="grid">
          {board.map((cell, i) => {
            // if this cell is empty and hovered, show the preview:
            let markToShow: React.ReactNode = null;

            if (cell !== null) {
              markToShow = getPlayerIcon(cell);
            } else if (hoveredIndex === i && !getWinner(board)) {
              markToShow = getPlayerIcon(currentPlayer);
            }
            return (
              <button
                key={i}
                className={`${cell ? "filled" : ""}`}
                onMouseEnter={() => {
                  if (!getWinner(board)) {
                    setHoveredIdx(i);
                  }
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleCellClick(i)}
              >
                {markToShow}
              </button>
            );
          })}
        </div>
        <div className={`side-icon-o ${currentPlayer === "O" ? "active" : ""}`}>
          {getPlayerIcon("O")}
        </div>
      </div>

      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer("X");
        }}
      >
        New Game
      </button>

      {winner && <div className="status">Winner: {winner}</div>}
      {draw && <div className="status">Draw!</div>}
    </div>
  );
}

export default TicTacToe;

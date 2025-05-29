import React, { useState, useEffect } from "react";
import { generateCardsAndBoard, checkMatch } from "./logic";
import type { Card, Board } from "./types";
import "./MemoryMatch.css";

function MemoryMatch() {
  const [board, setBoard] = useState<Board>([]);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    const items = [
      "dog",
      "cat",
      "mouse",
      "bear",
      "pig",
      "cow",
      "bird",
      "fox",
      "panda",
      "monkey",
    ];
    setBoard(generateCardsAndBoard(10, items));
  }, []);

  // whenever two cards are chosen, compare them
  useEffect(() => {
    if (!firstChoice || !secondChoice) return;

    setDisabled(true);
    setBoard((d) =>
      checkMatch(d, firstChoice.id, secondChoice.id).map((c) =>
        c.id === firstChoice.id || c.id === secondChoice.id
          ? { ...c, flipped: true }
          : c
      )
    );

    setTimeout(() => {
      // flip back non-matched cards
      setBoard((d) => d.map((c) => (c.matched ? c : { ...c, flipped: false })));
      resetTurn();
    }, 1000);
  }, [firstChoice, secondChoice]);

  function handleClick(card: Card) {
    if (disabled || card.flipped || card.matched) return;
    setBoard((d) =>
      d.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    if (!firstChoice) {
      setFirstChoice(card);
    } else {
      setSecondChoice(card);
    }
  }

  function resetTurn() {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((t) => t + 1);
    setDisabled(false);
  }

  return (
    <div className="memory">
      <h1>Memory Match</h1>
      <p>Turns: {turns}</p>
      <div className="board">
        {board.map((c) => (
          <button
            key={c.id}
            className={`card ${c.flipped ? "flipped" : ""} `}
            onClick={() => handleClick(c)}
          >
            {c.flipped || c.matched ? c.content : "?"}
          </button>
        ))}
      </div>
      <button onClick={() => window.location.reload()}>Reset Game</button>
    </div>
  );
}

export default MemoryMatch;

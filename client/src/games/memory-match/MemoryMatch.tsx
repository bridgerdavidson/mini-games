import React, { useState, useEffect } from "react";
import { generateCardsAndBoard, checkMatch } from "./logic";
import type { Card, Board } from "./types";

import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa6";
import { GiSeatedMouse } from "react-icons/gi";
import { GiBearFace } from "react-icons/gi";
import { GiPig } from "react-icons/gi";
import { GiCow } from "react-icons/gi";
import { GiFox } from "react-icons/gi";
import { GiPanda } from "react-icons/gi";
import { GiMonkey } from "react-icons/gi";
import { GiTurtle } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      "turtle",
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
    }, 800);
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

  function getGameIcon(icon: string) {
    switch (icon) {
      case "dog":
        return <FaDog />;
      case "cat":
        return <FaCat />;
      case "mouse":
        return <GiSeatedMouse />;
      case "bear":
        return <GiBearFace />;
      case "pig":
        return <GiPig />;
      case "cow":
        return <GiCow />;
      case "fox":
        return <GiFox />;
      case "panda":
        return <GiPanda />;
      case "monkey":
        return <GiMonkey />;
      case "turtle":
        return <GiTurtle />;
      default:
        return null;
    }
  }

  const gameOver = board.length > 0 && board.every((c) => c.matched);

  return (
    <div className="memory">
      <Link to="/" className="back-button">
        back
      </Link>
      <h1>Memory Match</h1>

      <div className="controls">
        <p className="turns">Turns: {turns}</p>
        <button className="new-game" onClick={() => window.location.reload()}>
          New Game
        </button>
      </div>
      <div className="board">
        {board.map((c: Card) => (
          <button
            key={c.id}
            className={`card ${c.flipped ? "flipped" : ""} ${
              c.matched ? "matched" : ""
            } `}
            onClick={() => handleClick(c)}
          >
            {c.flipped || c.matched ? (
              <div className="icon">{getGameIcon(c.content)}</div>
            ) : (
              <div className="icon-question">
                <FaQuestion />
              </div>
            )}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="game-over-backdrop">
          <div className="game-over-card">
            <h2>You Win!</h2>
            <p>Turns: {turns}</p>
            <button
              className="new-game"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryMatch;

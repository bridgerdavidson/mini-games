import { useParams } from "react-router-dom";
import TicTacToe from "../games/tic-tac-toe/TicTacToe";
import MemoryMatch from "./MemoryMatch";
import WordSearch from "./WordSearch";

function GameRouter() {
  const { gameId } = useParams();

  switch (gameId) {
    case "tic-tac-toe":
      return <TicTacToe />;
    case "memory-match":
      return <MemoryMatch />;
    case "word-search":
      return <WordSearch />;
    default:
      return <div>Game not found.</div>;
  }
}

export default GameRouter;

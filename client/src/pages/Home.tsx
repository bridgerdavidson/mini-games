import { useGames } from "../hooks/useGames";
import "./Home.css";
import { Link } from "react-router-dom";
import { GiTicTacToe } from "react-icons/gi";
import { LuBrain } from "react-icons/lu";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

function getGameIcon(gameId: string) {
  switch (gameId) {
    case "tic-tac-toe":
      return <GiTicTacToe />;
    case "memory-match":
      return <LuBrain />;
    case "word-search":
      return <IoMdSearch />;
    default:
      return <IoGameControllerOutline />;
  }
}

function Home() {
  const games = useGames();
  return (
    <div className="return-page">
      <h1>
        Pick a <span>Game</span>
      </h1>
      <div className="game-container">
        {games.map((g) => (
          <Link to={`/games/${g.id}`} className="game-button">
            <div className="icon">{getGameIcon(g.id)}</div>
            <span>{g.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;

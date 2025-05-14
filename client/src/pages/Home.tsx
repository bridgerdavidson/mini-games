import { useGames } from "../hooks/useGames";
import "./Home.css";
import { Link } from "react-router-dom";

import React from "react";

function Home() {
  const games = useGames();
  return (
    <ul>
      {games.map((g) => (
        <li key={g.id}>
          <Link to={`/games/${g.id}`}>
            <img src={g.icon} />
            <span>{g.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;

import Home from "./pages/Home";
import GameRouter from "./pages/GameRouter";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:gameId" element={<GameRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

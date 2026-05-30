import { useState } from "react";

import HomePage from "./src/pages/HomePage";
import GamesPage from "./src/pages/GamesPage";
import RatingPage from "./src/pages/RatingPage";
import SudokuPage from "./src/pages/SudokuPage";

import GameBoard from "./src/games/sudoku/GameBoard";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      {page === "home" && (
        <HomePage setPage={setPage} />
      )}

      {page === "games" && (
        <GamesPage setPage={setPage} />
      )}

      {page === "rating" && (
        <RatingPage setPage={setPage} />
      )}

      {page === "sudoku" && (
        <SudokuPage setPage={setPage} />
      )}

      {page === "play" && (
        <div>
          <button
            onClick={() => setPage("sudoku")}
          >
            ⬅ Orqaga
          </button>

          <GameBoard />
        </div>
      )}
    </div>
  );
}

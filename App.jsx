import { useState } from "react";

import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import RatingPage from "./pages/RatingPage";
import SudokuPage from "./pages/SudokuPage";

import GameBoard from "./games/sudoku/GameBoard";

export default function App() {
  const [page, setPage] =
    useState("home");

  return (
    <div className="app">

      {page === "home" && (
        <HomePage
          setPage={setPage}
        />
      )}

      {page === "games" && (
        <GamesPage
          setPage={setPage}
        />
      )}

      {page === "rating" && (
        <RatingPage
          setPage={setPage}
        />
      )}

      {page === "sudoku" && (
        <SudokuPage
          setPage={setPage}
        />
      )}

      {page === "play" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginBottom: "15px"
            }}
          >
            <button
              className="stats-btn"
              onClick={() =>
                setPage("sudoku")
              }
            >
              ⬅ Orqaga
            </button>

            <div
              style={{
                color: "#38bdf8",
                fontSize: "28px",
                fontWeight: "700"
              }}
            >
              🧩 Sudoku
            </div>
          </div>

          <GameBoard />
        </>
      )}

    </div>
  );
}

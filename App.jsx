import { useState } from "react";

import "./games/sudoku/style.css";

import GameBoard from "./games/sudoku/GameBoard";

export default function App() {
  const [page, setPage] =
    useState("home");

  return (
    <div className="app">

      {page === "home" && (
        <>
          <div className="title">
            🎮 Bolish Games
          </div>

          <button
            className="newgame"
            onClick={() =>
              setPage("games")
            }
          >
            🎲 O'yinlar
          </button>

          <button
            className="stats-btn"
            onClick={() =>
              setPage("rating")
            }
          >
            🏆 Reyting
          </button>
        </>
      )}

      {page === "games" && (
        <>
          <div className="title">
            🎲 O'yinlar
          </div>

          <button
            className="newgame"
            onClick={() =>
              setPage("sudoku")
            }
          >
            🧩 Sudoku
          </button>

          <button
            className="stats-btn"
            onClick={() =>
              setPage("home")
            }
          >
            ⬅ Orqaga
          </button>
        </>
      )}

      {page === "rating" && (
        <>
          <div className="title">
            🏆 TOP 100
          </div>

          <div className="top-card">
            Reyting tizimi
            keyin qo'shiladi
          </div>

          <button
            className="stats-btn"
            onClick={() =>
              setPage("home")
            }
          >
            ⬅ Orqaga
          </button>
        </>
      )}

      {page === "sudoku" && (
        <>
          <div className="title">
            🧩 Sudoku
          </div>

          <button
            className="newgame"
            onClick={() =>
              setPage("play")
            }
          >
            ▶ O'YNASH
          </button>

          <button
            className="stats-btn"
            onClick={() =>
              setPage("games")
            }
          >
            ⬅ Orqaga
          </button>
        </>
      )}

      {page === "play" && (
        <>
          <div className="title">
            🧩 Sudoku
          </div>

          <GameBoard />
        </>
      )}

    </div>
  );
      }

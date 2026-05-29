import { useState } from "react";

export default function App() {
  const [page, setPage] =
    useState("home");

  if (page === "home") {
    return (
      <div className="app">
        <h1 className="title">
          🎮 Bolish Games
        </h1>

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
      </div>
    );
  }

  if (page === "games") {
    return (
      <div className="app">
        <h1 className="title">
          🎲 O'yinlar
        </h1>

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
      </div>
    );
  }

  if (page === "rating") {
    return (
      <div className="app">
        <h1 className="title">
          🏆 Reyting
        </h1>

        <button
          className="stats-btn"
          onClick={() =>
            setPage("home")
          }
        >
          ⬅ Orqaga
        </button>
      </div>
    );
  }

  return null;
}

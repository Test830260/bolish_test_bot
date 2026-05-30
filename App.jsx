import { useState } from "react";
import HomePage from "./src/pages/HomePage";
import GamesPage from "./src/pages/GamesPage";
import RatingPage from "./src/pages/RatingPage";
import SudokuPage from "./src/pages/SudokuPage";
import GameBoard from "./src/games/sudoku/GameBoard";

export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState(null);

  const navigate = (to) => {
    setPrevPage(page);
    setPage(to);
  };

  const goBack = () => {
    if (prevPage) {
      setPage(prevPage);
      setPrevPage(null);
    } else {
      setPage("home");
    }
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#08080e", minHeight: "100vh", color: "#f1f1fa" }}>
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "games" && <GamesPage navigate={navigate} goBack={goBack} />}
      {page === "rating" && <RatingPage navigate={navigate} goBack={goBack} />}
      {page === "sudoku" && <SudokuPage navigate={navigate} goBack={goBack} />}
      {page === "play" && (
        <div>
          <button
            onClick={() => navigate("sudoku")}
            style={{ margin: "16px", padding: "10px 20px", borderRadius: "12px", border: "none", background: "#20202e", color: "#f1f1fa", fontSize: "16px", cursor: "pointer" }}
          >
            ← Orqaga
          </button>
          <GameBoard />
        </div>
      )}
    </div>
  );
      }

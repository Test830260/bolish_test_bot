import "./games/sudoku/style.css";
import GameBoard from "./games/sudoku/GameBoard";

export default function App() {
  return (
    <div className="app">
      <div className="title">🧩 Sudoku</div>
      <GameBoard />
    </div>
  );
}

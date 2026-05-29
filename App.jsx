import "./style.css";
import GameBoard from "./GameBoard";

export default function App() {
  return (
    <div className="app">
      <div className="title">🧩 Sudoku</div>

      <GameBoard />
    </div>
  );
}

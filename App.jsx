import { useState } from "react";
import "./style.css";

export default function App() {
  const [selected, setSelected] = useState(null);

  const board = [
    [0,2,1,0,0,7,8,6,0],
    [0,4,5,8,2,1,7,3,9],
    [0,8,3,0,0,0,2,5,0],
    [3,0,4,1,0,0,6,7,0],
    [8,0,7,4,0,6,0,2,0],
    [2,6,0,7,8,5,4,0,0],
    [0,3,2,0,4,0,5,0,7],
    [4,0,6,5,0,0,3,8,0],
    [0,0,0,2,7,0,0,0,0]
  ];

  return (
    <div className="app">
      <div className="title">🧩 Sudoku</div>

      <div className="difficulty">
        <button className="diff-btn active">Oson</button>
        <button className="diff-btn">O'rta</button>
        <button className="diff-btn">Qiyin</button>
      </div>

      <div className="board">
        {board.flat().map((cell, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`cell ${selected === i ? "selected" : ""}`}
          >
            {cell === 0 ? "" : cell}
          </div>
        ))}
      </div>

      <div className="numbers">
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button key={n} className="num-btn">
            {n}
          </button>
        ))}
      </div>

      <button className="delete-btn">
        ❌ O'chirish
      </button>

      <div className="info">
        <span>Xatolar: 0/3</span>
        <span>32/81</span>
      </div>

      <button className="newgame">
        🔄 Yangi o'yin
      </button>
    </div>
  );
}

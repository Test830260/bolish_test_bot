import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "sudoku") {
    return (
      <div style={{padding:20}}>
        <button onClick={() => setPage("home")}>⬅ Orqaga</button>
        <h1>🧩 Sudoku</h1>
        <p>Sudoku sahifasi (template)</p>
      </div>
    );
  }

  return (
    <div style={{padding:20}}>
      <h1>🎮 Game Platform</h1>
      <button onClick={() => setPage("sudoku")}>Sudoku</button>
    </div>
  );
}

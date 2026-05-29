import { useState } from "react";

export default function App() {
  const [board, setBoard] = useState([
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ]);

  const handleChange = (r, c, value) => {
    const newBoard = [...board];
    newBoard[r][c] = value === "" ? 0 : Number(value);
    setBoard(newBoard);
  };

  return (
    <div
      style={{
        padding: 10,
        background: "#111",
        minHeight: "100vh",
        color: "white",
        textAlign: "center"
      }}
    >
      <h1>🧩 Sudoku</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9,40px)",
          justifyContent: "center",
          gap: "2px"
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              value={cell === 0 ? "" : cell}
              onChange={(e) =>
                handleChange(r, c, e.target.value)
              }
              maxLength="1"
              style={{
                width: 40,
                height: 40,
                textAlign: "center",
                fontSize: 20
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

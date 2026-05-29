import { useState } from "react";

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
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        padding: 15,
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ color: "#00ff88", textAlign: "center" }}>
        🧩 SUDOKU
      </h1>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 15
        }}
      >
        <button>Oson</button>
        <button>O'rta</button>
        <button>Qiyin</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9,1fr)",
          gap: 2,
          border: "3px solid #00ff88"
        }}
      >
        {board.flat().map((cell, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{
              height: 40,
              background:
                selected === i ? "#00ff8844" : "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #00ff88",
              fontSize: 22
            }}
          >
            {cell === 0 ? "" : cell}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9,1fr)",
          gap: 5,
          marginTop: 20
        }}
      >
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button key={n}>{n}</button>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          marginTop: 15,
          padding: 15
        }}
      >
        ❌ O'chirish
      </button>

      <p style={{ marginTop: 15 }}>
        Xatolar: 0/3
      </p>

      <button
        style={{
          width: "100%",
          background: "#00aa33",
          color: "white",
          padding: 15,
          border: "none",
          borderRadius: 10
        }}
      >
        🔄 Yangi o'yin
      </button>
    </div>
  );
}

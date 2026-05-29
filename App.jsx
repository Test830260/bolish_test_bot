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
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          color: "#00ff88",
          textAlign: "center",
          marginBottom: 20
        }}
      >
        🧩 SUDOKU
      </h1>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20
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
          border: "4px solid #00ff88",
          maxWidth: 620,
          margin: "0 auto"
        }}
      >
        {board.flat().map((cell, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;

          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                height: 48,
                background:
                  selected === i ? "#00ff8844" : "#222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 24,
                cursor: "pointer",

                borderTop:
                  row === 0
                    ? "none"
                    : row % 3 === 0
                    ? "4px solid #00ff88"
                    : "1px solid #00ff88",

                borderLeft:
                  col === 0
                    ? "none"
                    : col % 3 === 0
                    ? "4px solid #00ff88"
                    : "1px solid #00ff88"
              }}
            >
              {cell === 0 ? "" : cell}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9,1fr)",
          gap: 5,
          marginTop: 20
        }}
      >
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button
            key={n}
            style={{
              height: 40,
              fontSize: 18
            }}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          marginTop: 15,
          padding: 15,
          fontSize: 18
        }}
      >
        ❌ O'chirish
      </button>

      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <span>Xatolar: 0/3</span>
        <span>To'ldirildi: 32/81</span>
      </div>

      <button
        style={{
          width: "100%",
          background: "#00aa33",
          color: "white",
          padding: 15,
          marginTop: 15,
          border: "none",
          borderRadius: 10,
          fontSize: 18
        }}
      >
        🔄 Yangi o'yin
      </button>
    </div>
  );
              }

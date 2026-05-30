import React from "react";

export default function GameBoard({ goBack }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080e",
        color: "white",
        padding: 20,
      }}
    >
      <button
        onClick={goBack}
        style={{
          padding: "10px 16px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Orqaga
      </button>

      <h1 style={{ marginTop: 30 }}>
        GAMEBOARD TEST
      </h1>

      <p>
        Agar shu yozuv chiqsa, GameBoard ishlayapti.
      </p>
    </div>
  );
}

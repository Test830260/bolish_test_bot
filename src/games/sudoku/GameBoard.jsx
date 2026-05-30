import React from "react";
import TopBar from "./components/TopBar";

export default function GameBoard({ goBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#08080e", color: "white" }}>
      <h1>GAMEBOARD TEST</h1>

      <TopBar
        seconds={0}
        score={1200}
        hints={3}
        undoCount={5}
      />
    </div>
  );
}

import React from "react";
import TopBar from "./components/TopBar";
import Board from "./components/Board";
import NumberPad from "./components/NumberPad";

export default function GameBoard({ goBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#08080e", color: "white" }}>
      <h1>GAMEBOARD TEST</h1>
<NumberPad
  enterNumber={() => {}}
/>

<h1 style={{color:"red"}}>
  NUMBERPAD TEST
</h1>
      <TopBar
        seconds={0}
        score={1200}
        hints={3}
        undoCount={5}
      />

      <Board
        board={[]}
        selected={null}
        selectedNumber={null}
        fixedCells={[]}
        chooseCell={() => {}}
      />
    </div>
  );
}

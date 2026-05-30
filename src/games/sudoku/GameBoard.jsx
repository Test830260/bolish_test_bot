import { useEffect, useState } from "react";

import useSudokuGame from "./hooks/useSudokuGame";
import useTimer from "./hooks/useTimer";

import TopBar from "./components/TopBar";
import Board from "./components/Board";
import NumberPad from "./components/NumberPad";
import ActionBar from "./components/ActionBar";
import VictoryModal from "./components/VictoryModal";
import GameOverModal from "./components/GameOverModal";

export default function GameBoard({ goBack }) {
  const game = useSudokuGame();

  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(5);

  const { seconds, formatTime } =
    useTimer(
      game.gameOver,
      game.victory
    );

  useEffect(() => {
    game.startGame("easy");
  }, []);

  function restartGame() {
    game.startGame(game.level);
    setHints(3);
    setUndoCount(5);
  }

  function useHint() {
    if (hints <= 0) return;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (
          game.board[r]?.[c] === 0
        ) {
          game.chooseCell(r, c);
          game.enterNumber(
            game.solution[r][c]
          );

          setHints(
            prev => prev - 1
          );

          return;
        }
      }
    }
  }

  function undoMove() {
    if (undoCount <= 0) return;

    setUndoCount(
      prev => prev - 1
    );
  }

  return (
    <div
      style={{
        background: "#08080e",
        minHeight: "100vh",
        color: "white",
        padding: "16px"
      }}
    >
      
      <TopBar
        seconds={seconds}
        score={1200}
        hints={hints}
        undoCount={undoCount}
      />

      <Board
        board={game.board}
        selected={game.selected}
        fixedCells={game.fixedCells}
        chooseCell={game.chooseCell}
        selectedNumber={
          game.selectedNumber
        }
      />

      <NumberPad
        enterNumber={
          game.enterNumber
        }
      />

      <ActionBar
        hints={hints}
        undoCount={undoCount}
        useHint={useHint}
        undoMove={undoMove}
        eraseCell={
          game.eraseCell
        }
      />

      {game.victory && (
        <VictoryModal
          level={game.level}
          score={1200}
          time={formatTime()}
          onRestart={
            restartGame
          }
        />
      )}

      {game.gameOver && (
        <GameOverModal
          level={game.level}
          score={1200}
          onRestart={
            restartGame
          }
        />
      )}
    </div>
  );
}

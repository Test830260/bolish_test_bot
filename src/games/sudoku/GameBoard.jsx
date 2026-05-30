import { useEffect, useState } from "react";
import useSudokuGame from "./hooks/useSudokuGame";
import useTimer from "./hooks/useTimer";
import useRating from "./hooks/useRating";
import useStats from "./hooks/useStats";
import TopBar from "./components/TopBar";
import Board from "./components/Board";
import NumberPad from "./components/NumberPad";
import ActionBar from "./components/ActionBar";
import VictoryModal from "./components/VictoryModal";
import GameOverModal from "./components/GameOverModal";
import StatsModal from "./components/StatsModal";

export default function GameBoard({ goBack }) {
  const game = useSudokuGame();
  const [showStats, setShowStats] = useState(false);
  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(5);
  const [history, setHistory] = useState([]);

  const { seconds, formatTime } = useTimer(game.gameOver, game.victory);
  const { score, getRank } = useRating();
  const { stats, getWinRate } = useStats();

  useEffect(() => {
    game.startGame("easy");
  }, []);

  function useHint() {
    if (hints <= 0) return;
    const empties = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (game.board[r][c] === 0 && !game.fixedCells[r][c]) {
          empties.push({ r, c });
        }
      }
    }
    if (empties.length === 0) return;
    const { r, c } = empties[Math.floor(Math.random() * empties.length)];
    game.chooseCell(r, c);
    game.enterNumber(game.solution[r][c]);
    setHints(h => h - 1);
  }

  function undoMove() {
    if (undoCount <= 0 || history.length === 0) return;
    const prev = history[history.length - 1];
    game.chooseCell(prev.r, prev.c);
    game.enterNumber(prev.val);
    setHistory(h => h.slice(0, -1));
    setUndoCount(u => u - 1);
  }

  function handleEnterNumber(num) {
    if (game.selected) {
      const { r, c } = game.selected;
      setHistory(h => [...h, { r, c, val: game.board[r][c] }]);
    }
    game.enterNumber(num);
  }

  return (
    <div style={{ background: "#08080e", minHeight: "100vh", paddingBottom: 20 }}>

      {/* BACK BUTTON */}
      {goBack && (
        <div style={{ padding: "12px 16px 0" }}>
          <button
            onClick={goBack}
            style={{ width: 38, height: 38, borderRadius: "50%", background: "#181824", border: "1px solid #28283a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", color: "#f1f1fa" }}
          >
            ←
          </button>
        </div>
      )}

      <TopBar
        seconds={seconds}
        score={score}
        hints={hints}
        undoCount={undoCount}
      />

      <Board
        board={game.board}
        selected={game.selected}
        selectedNumber={game.selectedNumber}
        fixedCells={game.fixedCells}
        chooseCell={game.chooseCell}
      />

      <NumberPad
        enterNumber={handleEnterNumber}
        setSelectedNumber={game.setSelectedNumber}
      />

      <ActionBar
        hints={hints}
        undoCount={undoCount}
        useHint={useHint}
        undoMove={undoMove}
        eraseCell={game.eraseCell}
      />

      {/* INFO ROW */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", gap: 10 }}>
        <div style={{ flex: 1, background: "#181824", border: "1px solid #28283a", borderRadius: 12, padding: "10px 8px", textAlign: "center", fontSize: 14, fontWeight: 700, color: "#f87171" }}>
          ❌ {game.errors}/3
        </div>
        <div style={{ flex: 1, background: "#181824", border: "1px solid #28283a", borderRadius: 12, padding: "10px 8px", textAlign: "center", fontSize: 14, fontWeight: 700, color: "#34d399" }}>
          ✅ {game.filled}/81
        </div>
      </div>

      {/* ACTION BUTTONS */}

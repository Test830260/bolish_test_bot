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

export default function GameBoard() {
  const game = useSudokuGame();

  const [showStats, setShowStats] =
    useState(false);

  const [hints, setHints] =
    useState(3);

  const [undoCount, setUndoCount] =
    useState(5);

  const {
    seconds,
    formatTime
  } = useTimer(
    game.gameOver,
    game.victory
  );

  const {
    score,
    getRank
  } = useRating();

  const {
    stats,
    getWinRate
  } = useStats();

  useEffect(() => {
    game.startGame("easy");
  }, []);

  function useHint() {
    // keyin to'ldiramiz
  }

  function undoMove() {
    // keyin to'ldiramiz
  }

  return (
    <>
      <TopBar
        seconds={seconds}
        score={score}
        hints={hints}
        undoCount={undoCount}
      />

      <Board
        board={game.board}
        selected={game.selected}
        fixedCells={game.fixedCells}
        chooseCell={game.chooseCell}
      />

      <NumberPad
        enterNumber={game.enterNumber}
      />

      <ActionBar
        hints={hints}
        undoCount={undoCount}
        useHint={useHint}
        undoMove={undoMove}
        eraseCell={game.eraseCell}
      />

      <div className="info">
        <span>
          ❌ {game.errors}/3
        </span>

        <span>
          📦 {game.filled}/81
        </span>
      </div>

      <button
        className="newgame"
        onClick={() =>
          game.startGame(
            game.level
          )
        }
      >
        🔄 Yangi o'yin
      </button>

      <button
        className="stats-btn"
        onClick={() =>
          setShowStats(true)
        }
      >
        📊 Statistika
      </button>

      <VictoryModal
        isOpen={game.victory}
        level={game.level}
        score={score}
        time={formatTime()}
        onRestart={() =>
          game.startGame(
            game.level
          )
        }
      />

      <GameOverModal
        isOpen={game.gameOver}
        level={game.level}
        score={score}
        onRestart={() =>
          game.startGame(
            game.level
          )
        }
      />

      <StatsModal
        isOpen={showStats}
        onClose={() =>
          setShowStats(false)
        }
        stats={{
          points: score,
          wins: stats.wins,
          losses: stats.losses,
          winRate: getWinRate(),
          hintsUsed:
            stats.hintsUsed,
          undosUsed:
            stats.undosUsed,
          bestEasy:
            stats.bestEasy,
          bestMedium:
            stats.bestMedium,
          bestHard:
            stats.bestHard,
          rank: getRank()
        }}
      />
    </>
  );
}

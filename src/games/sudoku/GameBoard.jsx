import { useEffect, useState } from "react";

import { createPuzzle } from "./sudoku";

import useTimer from "./hooks/useTimer";
import useHistory from "./hooks/useHistory";
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
  const [level, setLevel] = useState("easy");

  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [fixedCells, setFixedCells] = useState([]);

  const [selected, setSelected] = useState(null);

  const [errors, setErrors] = useState(0);
  const [filled, setFilled] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const [showStats, setShowStats] =
    useState(false);

  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] =
    useState(5);

  const {
    seconds,
    formatTime,
    resetTimer
  } = useTimer(
    gameOver,
    victory
  );

  const {
    saveMove,
    undo,
    clearHistory
  } = useHistory();

  const {
    score,
    addCorrectMove,
    addWin,
    addMistake,
    useHintPenalty,
    useUndoPenalty,
    getRank
  } = useRating();

  const {
    stats,
    addWin: addStatsWin,
    addLoss: addStatsLoss,
    addHintUse,
    addUndoUse,
    getWinRate
  } = useStats();

  useEffect(() => {
    startGame("easy");
  }, []);

  function startGame(difficulty) {
    const game =
      createPuzzle(difficulty);

    const fixed =
      game.puzzle.map(row =>
        row.map(
          cell => cell !== 0
        )
      );

    setBoard(game.puzzle);
    setSolution(game.solution);
    setFixedCells(fixed);

    setLevel(difficulty);

    setSelected(null);

    setErrors(0);
    setGameOver(false);
    setVictory(false);

    setHints(3);
    setUndoCount(5);

    resetTimer();
    clearHistory();

    const count =
      game.puzzle
        .flat()
        .filter(
          x => x !== 0
        ).length;

    setFilled(count);
  }

  function chooseCell(
    row,
    col
  ) {
    if (
      gameOver ||
      victory
    )
      return;

    if (
      fixedCells[row]?.[col]
    )
      return;

    setSelected({
      row,
      col
    });
  }

  function enterNumber(
    num
  ) {
    if (
      !selected ||
      gameOver ||
      victory
    )
      return;

    const {
      row,
      col
    } = selected;

    if (
      fixedCells[row][col]
    )
      return;

    const copy =
      board.map(r => [
        ...r
      ]);

    if (
      solution[row][col] ===
      num
    ) {
      saveMove(board);

      copy[row][col] = num;

      setBoard(copy);

      addCorrectMove();

      const newFilled =
        filled + 1;

      setFilled(
        newFilled
      );

      if (
        newFilled === 81
      ) {
        addWin(level);

        addStatsWin(
          level,
          seconds
        );

        setVictory(
          true
        );
      }
    } else {
      addMistake();

      const nextErrors =
        errors + 1;

      setErrors(
        nextErrors
      );

      if (
        nextErrors >= 3
      ) {
        addStatsLoss();

        setGameOver(
          true
        );
      }
    }
  }

  function eraseCell() {
    if (!selected)
      return;

    const {
      row,
      col
    } = selected;

    if (
      fixedCells[row][col]
    )
      return;

    const copy =
      board.map(r => [
        ...r
      ]);

    copy[row][col] = 0;

    setBoard(copy);
  }

  function useHint() {
    if (
      !selected ||
      hints <= 0
    )
      return;

    const {
      row,
      col
    } = selected;

    const copy =
      board.map(r => [
        ...r
      ]);

    copy[row][col] =
      solution[row][col];

    setBoard(copy);

    setHints(
      prev => prev - 1
    );

    useHintPenalty();
    addHintUse();
  }

  function undoMove() {
    if (
      undoCount <= 0
    )
      return;

    const previous =
      undo(board);

    setBoard(previous);

    setUndoCount(
      prev => prev - 1
    );

    useUndoPenalty();
    addUndoUse();
  }

  return (
    <>
      <TopBar
        seconds={seconds}
        score={score}
        hints={hints}
        undoCount={
          undoCount
        }
      />

      <Board
        board={board}
        selected={
          selected
        }
        fixedCells={
          fixedCells
        }
        chooseCell={
          chooseCell
        }
      />

      <NumberPad
        enterNumber={
          enterNumber
        }
      />

      <ActionBar
        hints={hints}
        undoCount={
          undoCount
        }
        useHint={
          useHint
        }
        undoMove={
          undoMove
        }
        eraseCell={
          eraseCell
        }
      />

      <div
        className="info"
      >
        <span>
          ❌ {errors}/3
        </span>

        <span>
          📦 {filled}/81
        </span>
      </div>

      <button
        className="newgame"
        onClick={() =>
          startGame(level)
        }
      >
        🔄 Yangi o'yin
      </button>

      <button
        className="stats-btn"
        onClick={() =>
          setShowStats(
            true
          )
        }
      >
        📊 Statistika
      </button>

      <VictoryModal
        level={level}
        score={score}
        time={formatTime()}
        onRestart={() =>
          startGame(level)
        }
      />

      <GameOverModal
        level={level}
        score={score}
        onRestart={() =>
          startGame(level)
        }
      />

      <StatsModal
        isOpen={
          showStats
        }
        onClose={() =>
          setShowStats(
            false
          )
        }
        stats={{
          points:
            score,
          wins:
            stats.wins,
          losses:
            stats.losses,
          winRate:
            getWinRate(),
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
          rank:
            getRank()
        }}
      />
    </>
  );
}

import {
  saveGame,
  loadGame,
  clearGame
} from "./storage";
import { useEffect, useState } from "react";
import { createPuzzle } from "./sudoku";

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

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    startGame("easy");
  }, []);

  useEffect(() => {
    if (gameOver || victory) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, victory]);

  useEffect(() => {
    const saveData = {
      board,
      solution,
      fixedCells,
      level,
      errors,
      filled,
      seconds
    };

    if (board.length) {
      localStorage.setItem(
        "sudoku-save",
        JSON.stringify(saveData)
      );
    }
  }, [
    board,
    solution,
    fixedCells,
    level,
    errors,
    filled,
    seconds
  ]);

  function startGame(difficulty) {
    const game = createPuzzle(difficulty);

    const fixed = game.puzzle.map((row) =>
      row.map((cell) => cell !== 0)
    );

    setBoard(game.puzzle);
    setSolution(game.solution);
    setFixedCells(fixed);

    setLevel(difficulty);

    setSelected(null);

    setErrors(0);

    setGameOver(false);

    setVictory(false);

    setSeconds(0);

    const count = game.puzzle
      .flat()
      .filter((x) => x !== 0).length;

    setFilled(count);
  }

  function chooseCell(row, col) {
    if (gameOver || victory) return;

    if (fixedCells[row]?.[col]) return;

    setSelected({ row, col });
  }

  function enterNumber(num) {
    if (!selected) return;

    if (gameOver || victory) return;

    const { row, col } = selected;

    if (fixedCells[row][col]) return;

    const copy = board.map((r) => [...r]);

    if (solution[row][col] === num) {
      if (copy[row][col] === 0) {
        copy[row][col] = num;

        setBoard(copy);

        const newFilled = filled + 1;

        setFilled(newFilled);

        if (newFilled === 81) {
          setVictory(true);
        }
      }
    } else {
      const newErrors = errors + 1;

      setErrors(newErrors);

      if (newErrors >= 3) {
        setGameOver(true);
      }
    }
  }

  function eraseCell() {
    if (!selected) return;

    const { row, col } = selected;

    if (fixedCells[row][col]) return;

    if (board[row][col] === 0) return;

    const copy = board.map((r) => [...r]);

    copy[row][col] = 0;

    setBoard(copy);

    setFilled((prev) => prev - 1);
  }

  function formatTime() {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
          color: "#38bdf8",
          fontSize: "22px",
          fontWeight: "bold"
        }}
      >
        ⏱ {formatTime()}
      </div>

      <div className="difficulty">

        <button
          className={`diff-btn ${
            level === "easy" ? "active" : ""
          }`}
          onClick={() => startGame("easy")}
        >
          Oson
        </button>

        <button
          className={`diff-btn ${
            level === "medium" ? "active" : ""
          }`}
          onClick={() => startGame("medium")}
        >
          O'rta
        </button>

        <button
          className={`diff-btn ${
            level === "hard" ? "active" : ""
          }`}
          onClick={() => startGame("hard")}
        >
          Qiyin
        </button>
      </div>

      <div className="board">
        {board.flat().map((cell, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;

          const isSelected =
            selected &&
            selected.row === row &&
            selected.col === col;

          const sameRow =
            selected &&
            selected.row === row;

          const sameCol =
            selected &&
            selected.col === col;

          const sameBox =
            selected &&
            Math.floor(selected.row / 3) ===
              Math.floor(row / 3) &&
            Math.floor(selected.col / 3) ===
              Math.floor(col / 3);

          return (
            <div
              key={i}
              onClick={() => chooseCell(row, col)}
              className="cell"
              style={{
                background: isSelected
                  ? "#38bdf855"
                  : sameRow || sameCol || sameBox
                  ? "#1f2b45"
                  : "#172033",

                borderRight:
                  col === 2 || col === 5
                    ? "4px solid #38bdf8"
                    : "1px solid #2e3b52",

                borderBottom:
                  row === 2 || row === 5
                    ? "4px solid #38bdf8"
                    : "1px solid #2e3b52",

                cursor: fixedCells[row]?.[col]
                  ? "default"
                  : "pointer",

                fontWeight: fixedCells[row]?.[col]
                  ? "700"
                  : "400",

                color: fixedCells[row]?.[col]
                  ? "#ffffff"
                  : "#7dd3fc",

                transition: "all .18s ease"
              }}
            >
              {cell === 0 ? "" : cell}
            </div>
          );
        })}
      </div>

      <div className="numbers">
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button
            key={n}
            className="num-btn"
            onClick={() => enterNumber(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        className="delete-btn"
        onClick={eraseCell}
      >
        ❌ O'chirish
      </button>

      <div className="info">
        <span>
          ❌ Xatolar: {errors}/3
        </span>

        <span>
          📦 {filled}/81
        </span>
      </div>

      <button
        className="newgame"
        onClick={() => startGame(level)}
      >
        🔄 Yangi o'yin
      </button>

      {victory && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "420px",
              background: "#172033",
              borderRadius: "24px",
              padding: "30px",
              textAlign: "center",
              border: "2px solid #38bdf8",
              boxShadow:
                "0 0 35px rgba(56,189,248,.4)"
            }}
          >
            <h1
              style={{
                color: "#38bdf8",
                marginBottom: "15px"
              }}
            >
              🏆 G'ALABA!
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#ffffff"
              }}
            >
              Sudoku muvaffaqiyatli yechildi!
            </p>

            <p
              style={{
                color: "#94a3b8"
              }}
            >
              ⏱ Vaqt: {formatTime()}
            </p>

            <button
              className="newgame"
              onClick={() => startGame(level)}
            >
              🔄 Yana o'ynash
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "420px",
              background: "#172033",
              borderRadius: "24px",
              padding: "30px",
              textAlign: "center",
              border: "2px solid #ef4444",
              boxShadow:
                "0 0 35px rgba(239,68,68,.4)"
            }}
          >
            <h1
              style={{
                color: "#ef4444",
                marginBottom: "15px"
              }}
            >
              💀 GAME OVER
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#ffffff"
              }}
            >
              3 ta xato qildingiz
            </p>

            <button
              className="newgame"
              onClick={() => startGame(level)}
            >
              🔄 Qayta boshlash
            </button>
          </div>
        </div>
      )}
    </>
  );
}

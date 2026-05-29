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

  useEffect(() => {
    startGame("easy");
  }, []);

  function startGame(difficulty) {
    const game = createPuzzle(difficulty);

    setBoard(game.puzzle);
    setSolution(game.solution);

    setFixedCells(
      game.puzzle.map((row) =>
        row.map((cell) => cell !== 0)
      )
    );

    setLevel(difficulty);
    setSelected(null);
    setErrors(0);
    setGameOver(false);

    const count = game.puzzle
      .flat()
      .filter((x) => x !== 0).length;

    setFilled(count);
  }

  function chooseCell(row, col) {
    if (gameOver) return;

    if (fixedCells[row]?.[col]) return;

    setSelected({ row, col });
  }

  function enterNumber(num) {
    if (!selected || gameOver) return;

    const { row, col } = selected;

    const copy = board.map((r) => [...r]);

    if (solution[row][col] === num) {
      if (copy[row][col] === 0) {
        copy[row][col] = num;

        setBoard(copy);

        const newFilled = filled + 1;
        setFilled(newFilled);

        if (newFilled === 81) {
          alert("🎉 Tabriklaymiz! Sudoku yechildi.");
          setGameOver(true);
        }
      }
    } else {
      const nextErrors = errors + 1;

      setErrors(nextErrors);

      if (nextErrors >= 3) {
        alert("💀 3 ta xato! O'yin tugadi.");
        setGameOver(true);
      }
    }
  }

  function eraseCell() {
    if (!selected || gameOver) return;

    const { row, col } = selected;

    if (fixedCells[row][col]) return;

    if (board[row][col] === 0) return;

    const copy = board.map((r) => [...r]);

    copy[row][col] = 0;

    setBoard(copy);
    setFilled(filled - 1);
  }

  return (
    <>
      <div className="difficulty">
        <button
          className={`diff-btn ${level === "easy" ? "active" : ""}`}
          onClick={() => startGame("easy")}
        >
          Oson
        </button>

        <button
          className={`diff-btn ${level === "medium" ? "active" : ""}`}
          onClick={() => startGame("medium")}
        >
          O'rta
        </button>

        <button
          className={`diff-btn ${level === "hard" ? "active" : ""}`}
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
                  : "#7dd3fc"
              }}
            >
              {cell === 0 ? "" : cell}
            </div>
          );
        })}
      </div>

      <div className="numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
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
        <span>❌ Xatolar: {errors}/3</span>
        <span>📦 {filled}/81</span>
      </div>

      <button
        className="newgame"
        onClick={() => startGame(level)}
      >
        🔄 Yangi o'yin
      </button>
    </>
  );
    }

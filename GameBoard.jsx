import { useEffect, useState } from "react";
import { createPuzzle } from "./sudoku";

export default function GameBoard() {
  const [level, setLevel] = useState("easy");
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
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
    if (board[row][col] !== 0) return;

    setSelected({ row, col });
  }

  function enterNumber(num) {
    if (!selected || gameOver) return;

    const { row, col } = selected;

    const copy = board.map((r) => [...r]);

    if (solution[row][col] === num) {
      copy[row][col] = num;
      setBoard(copy);

      const newFilled = filled + 1;
      setFilled(newFilled);

      if (newFilled === 81) {
        alert("🎉 Tabriklaymiz!");
        setGameOver(true);
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

          return (
            <div
              key={i}
              onClick={() => chooseCell(row, col)}
              className={`cell ${
                selected &&
                selected.row === row &&
                selected.col === col
                  ? "selected"
                  : ""
              }`}
              style={{
                borderRight:
                  col === 2 || col === 5
                    ? "3px solid #38bdf8"
                    : "1px solid #2e3b52",

                borderBottom:
                  row === 2 || row === 5
                    ? "3px solid #38bdf8"
                    : "1px solid #2e3b52"
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

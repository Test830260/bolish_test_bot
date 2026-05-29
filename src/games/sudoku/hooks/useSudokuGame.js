import { useState } from "react";
import { createPuzzle } from "../sudoku";

export default function useSudokuGame() {
  const [level, setLevel] = useState("easy");

  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [fixedCells, setFixedCells] = useState([]);

  const [selected, setSelected] = useState(null);
const [selectedNumber,
  setSelectedNumber] =
  useState(null);
  const [filled, setFilled] = useState(0);
  const [errors, setErrors] = useState(0);

  const [gameOver, setGameOver] =
    useState(false);

  const [victory, setVictory] =
    useState(false);

  function startGame(difficulty = "easy") {
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

setSelectedNumber(null);

setErrors(0);

    setGameOver(false);
    setVictory(false);

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
setSelectedNumber(
  board[row][col] || null
);
  
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
      copy[row][col] = num;
setSelectedNumber(num);
      setBoard(copy);

      const newFilled =
        filled + 1;

      setFilled(
        newFilled
      );

      if (
        newFilled === 81
      ) {
        setVictory(
          true
        );
      }
    } else {
      const nextErrors =
        errors + 1;

      setErrors(
        nextErrors
      );

      if (
        nextErrors >= 3
      ) {
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
      fixedCells[row]?.[col]
    )
      return;

    const copy =
      board.map(r => [
        ...r
      ]);

    copy[row][col] = 0;

    setBoard(copy);
  }

  return {
    level,

    board,
    solution,
    fixedCells,

    selected,
selectedNumber,
    errors,
    filled,

    gameOver,
    victory,

    startGame,

    chooseCell,

    enterNumber,

    eraseCell,

    setLevel,

    setGameOver,
    setVictory
  };
}

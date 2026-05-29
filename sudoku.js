export function isValid(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
    if (grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

export function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const nums = [1,2,3,4,5,6,7,8,9]
          .sort(() => Math.random() - 0.5);

        for (let num of nums) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;

            if (solve(grid)) return true;

            grid[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

export function generateSolvedBoard() {
  const board = Array.from(
    { length: 9 },
    () => Array(9).fill(0)
  );

  solve(board);

  return board;
}

export function createPuzzle(level = "easy") {
  const solved = generateSolvedBoard();

  const puzzle = solved.map(row => [...row]);

  let removeCount = 35;

  if (level === "medium") removeCount = 45;
  if (level === "hard") removeCount = 55;

  while (removeCount > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removeCount--;
    }
  }

  return {
    puzzle,
    solution: solved
  };
}

export function saveGame(data) {
  localStorage.setItem(
    "sudoku_save",
    JSON.stringify(data)
  );
}

export function loadGame() {
  const data = localStorage.getItem("sudoku_save");

  if (!data) return null;

  return JSON.parse(data);
}

export function clearGame() {
  localStorage.removeItem("sudoku_save");
}

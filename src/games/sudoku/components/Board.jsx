export default function Board({
  board,
  selected,
  fixedCells,
  chooseCell,
  selectedNumber
}) {
  return (
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

        const sameNumber =
          selectedNumber &&
          cell === selectedNumber;

        return (
          <div
            key={i}
            onClick={() =>
              chooseCell(row, col)
            }
            className="cell"
            style={{
              background:
                isSelected
                  ? "#38bdf855"
                  : sameNumber
                  ? "#2563eb66"
                  : sameRow ||
                    sameCol ||
                    sameBox
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

              cursor:
                fixedCells[row]?.[col]
                  ? "default"
                  : "pointer",

              fontWeight:
                fixedCells[row]?.[col]
                  ? "700"
                  : "400",

              color:
                fixedCells[row]?.[col]
                  ? "#ffffff"
                  : "#7dd3fc",

              transition:
                "all .18s ease"
            }}
          >
            {cell === 0 ? "" : cell}
          </div>
        );
      })}
    </div>
  );
}

export default function Board({
  board,
  selected,
  fixedCells,
  chooseCell,
  selectedNumber
}) {
  if (!board || board.length !== 9) {
    return (
      <div style={{ color: "white" }}>
        Sudoku yuklanmoqda...
      </div>
    );
  }

  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        maxWidth: "520px",
        margin: "20px auto"
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected =
            selected &&
            selected.row === rowIndex &&
            selected.col === colIndex;

          const isFixed =
            fixedCells?.[rowIndex]?.[colIndex];

          const sameNumber =
            selectedNumber &&
            cell === selectedNumber;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() =>
                chooseCell(
                  rowIndex,
                  colIndex
                )
              }
              className="cell"
              style={{
                background: isSelected
                  ? "#38bdf855"
                  : sameNumber
                  ? "#2563eb66"
                  : "#172033",

                border:
                  "1px solid #2e3b52",

                borderRight:
                  colIndex === 2 ||
                  colIndex === 5
                    ? "3px solid #38bdf8"
                    : undefined,

                borderBottom:
                  rowIndex === 2 ||
                  rowIndex === 5
                    ? "3px solid #38bdf8"
                    : undefined,

                color: isFixed
                  ? "#ffffff"
                  : "#7dd3fc",

                fontWeight: isFixed
                  ? "700"
                  : "400",

                cursor: isFixed
                  ? "default"
                  : "pointer",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                height: "52px",
                fontSize: "24px"
              }}
            >
              {cell === 0 ? "" : cell}
            </div>
          );
        })
      )}
    </div>
  );
}

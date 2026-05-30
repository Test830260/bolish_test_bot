export default function Board({
  board = [],
  selected,
  selectedNumber,
  fixedCells = [],
  chooseCell
}) {
  if (!board.length) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: 20
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 620,
        margin: "20px auto",
        padding: "0 10px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          background: "#18223d",
          border: "3px solid #38bdf8",
          borderRadius: 10,
          overflow: "hidden"
        }}
      >
        {board.flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selected &&
              selected.row === rowIndex &&
              selected.col === colIndex;

            const isFixed =
              fixedCells[rowIndex]?.[colIndex];

            const sameNumber =
              selectedNumber &&
              cell === selectedNumber;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() =>
                  chooseCell(rowIndex, colIndex)
                }
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",

                  fontSize: 22,
                  fontWeight: "bold",

                  color: isFixed
                    ? "#ffffff"
                    : "#38bdf8",

                  background: isSelected
                    ? "#0ea5e9"
                    : sameNumber
                    ? "#23365f"
                    : "#18223d",

                  borderRight:
                    colIndex === 2 ||
                    colIndex === 5
                      ? "3px solid #38bdf8"
                      : "1px solid rgba(255,255,255,0.12)",

                  borderBottom:
                    rowIndex === 2 ||
                    rowIndex === 5
                      ? "3px solid #38bdf8"
                      : "1px solid rgba(255,255,255,0.12)",

                  transition: "0.15s"
                }}
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
              }

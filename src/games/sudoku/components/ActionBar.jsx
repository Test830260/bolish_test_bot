export default function ActionBar({
  hints,
  undoCount,
  useHint,
  undoMove,
  eraseCell
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "10px",
          marginTop: "15px"
        }}
      >
        <button
          className="hint-btn"
          onClick={useHint}
        >
          💡
          <br />
          {hints}
        </button>

        <button
          className="undo-btn"
          onClick={undoMove}
        >
          ↩️
          <br />
          {undoCount}
        </button>

        <button
          className="delete-btn"
          onClick={eraseCell}
        >
          ❌
          <br />
          Del
        </button>
      </div>
    </>
  );
}

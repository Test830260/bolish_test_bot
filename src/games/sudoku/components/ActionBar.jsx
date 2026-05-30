export default function ActionBar({
  hints,
  undoCount,
  useHint,
  undoMove,
  eraseCell
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "12px",
        padding: "15px",
        maxWidth: "620px",
        margin: "0 auto"
      }}
    >
      <button
        onClick={useHint}
        style={{
          height: "70px",
          borderRadius: "18px",
          border: "1px solid #fbbf24",
          background: "#18223d",
          color: "#fff",
          fontSize: "30px"
        }}
      >
        💡
        <div
          style={{
            fontSize: "16px",
            marginTop: "4px"
          }}
        >
          {hints}
        </div>
      </button>

      <button
        onClick={undoMove}
        style={{
          height: "70px",
          borderRadius: "18px",
          border: "1px solid #38bdf8",
          background: "#18223d",
          color: "#fff",
          fontSize: "30px"
        }}
      >
        ↩️
        <div
          style={{
            fontSize: "16px",
            marginTop: "4px"
          }}
        >
          {undoCount}
        </div>
      </button>

      <button
        onClick={eraseCell}
        style={{
          height: "70px",
          borderRadius: "18px",
          border: "1px solid #ef4444",
          background: "#18223d",
          color: "#fff",
          fontSize: "30px"
        }}
      >
        ❌
      </button>
    </div>
  );
        }

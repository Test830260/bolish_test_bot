export default function TopBar({
  seconds,
  score,
  hints,
  undoCount
}) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const time =
    `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4,1fr)",
        gap: "8px",
        marginBottom: "15px"
      }}
    >
      <div className="top-card">
        ⏱<br />
        {time}
      </div>

      <div className="top-card">
        ⭐<br />
        {score}
      </div>

      <div className="top-card">
        💡<br />
        {hints}
      </div>

      <div className="top-card">
        ↩️<br />
        {undoCount}
      </div>
    </div>
  );
}

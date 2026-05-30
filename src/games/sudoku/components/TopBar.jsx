export default function TopBar({
  seconds,
  score,
  hints,
  undoCount
}) {
  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "10px",
        padding: "15px",
        maxWidth: "620px",
        margin: "0 auto"
      }}
    >
      <div
        style={{
          background: "#18223d",
          border: "1px solid #38bdf8",
          borderRadius: "16px",
          padding: "12px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "22px"
          }}
        >
          ⏱️
        </div>

        <div
          style={{
            color: "#fff",
            fontWeight: "700",
            marginTop: "5px"
          }}
        >
          {formatTime(seconds)}
        </div>
      </div>

      <div
        style={{
          background: "#18223d",
          border: "1px solid #fbbf24",
          borderRadius: "16px",
          padding: "12px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "22px"
          }}
        >
          ⭐
        </div>

        <div
          style={{
            color: "#fff",
            fontWeight: "700",
            marginTop: "5px"
          }}
        >
          {score}
        </div>
      </div>

      <div
        style={{
          background: "#18223d",
          border: "1px solid #fbbf24",
          borderRadius: "16px",
          padding: "12px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "22px"
          }}
        >
          💡
        </div>

        <div
          style={{
            color: "#fff",
            fontWeight: "700",
            marginTop: "5px"
          }}
        >
          {hints}
        </div>
      </div>

      <div
        style={{
          background: "#18223d",
          border: "1px solid #38bdf8",
          borderRadius: "16px",
          padding: "12px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "22px"
          }}
        >
          ↩️
        </div>

        <div
          style={{
            color: "#fff",
            fontWeight: "700",
            marginTop: "5px"
          }}
        >
          {undoCount}
        </div>
      </div>
    </div>
  );
          }

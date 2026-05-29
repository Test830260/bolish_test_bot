export default function VictoryModal({
  level,
  score,
  time,
  onRestart
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "420px",
          background: "#172033",
          borderRadius: "24px",
          padding: "30px",
          textAlign: "center",
          border: "2px solid #38bdf8",
          boxShadow:
            "0 0 35px rgba(56,189,248,.4)"
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            marginBottom: "15px"
          }}
        >
          🏆 G'ALABA!
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#ffffff"
          }}
        >
          Sudoku muvaffaqiyatli yechildi!
        </p>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          <p style={{ color: "#94a3b8" }}>
            🎯 Daraja: {level}
          </p>

          <p style={{ color: "#94a3b8" }}>
            ⭐ Reyting: {score}
          </p>

          <p style={{ color: "#94a3b8" }}>
            ⏱ Vaqt: {time}
          </p>
        </div>

        <button
          className="newgame"
          onClick={onRestart}
        >
          🔄 Yana o'ynash
        </button>
      </div>
    </div>
  );
}

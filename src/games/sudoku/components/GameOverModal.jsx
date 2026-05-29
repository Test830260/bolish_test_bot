export default function GameOverModal({
  level,
  score,
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
          border: "2px solid #ef4444",
          boxShadow:
            "0 0 35px rgba(239,68,68,.4)"
        }}
      >
        <h1
          style={{
            color: "#ef4444",
            marginBottom: "15px"
          }}
        >
          💀 GAME OVER
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#ffffff"
          }}
        >
          3 ta xato qildingiz
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
        </div>

        <button
          className="newgame"
          onClick={onRestart}
        >
          🔄 Qayta boshlash
        </button>
      </div>
    </div>
  );
            }

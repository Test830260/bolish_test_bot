export default function StatsModal({
  isOpen,
  onClose,
  stats
}) {
  if (!isOpen) return null;

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
          maxWidth: "450px",
          background: "#172033",
          borderRadius: "24px",
          padding: "25px",
          border: "2px solid #38bdf8",
          boxShadow:
            "0 0 35px rgba(56,189,248,.3)"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#38bdf8",
            marginBottom: "20px"
          }}
        >
          📊 Statistika
        </h2>

        <div className="stats-grid">
          <div className="stat-item">
            ⭐ Reyting
            <br />
            {stats.points}
          </div>

          <div className="stat-item">
            🏆 G'alaba
            <br />
            {stats.wins}
          </div>

          <div className="stat-item">
            💀 Mag'lubiyat
            <br />
            {stats.losses}
          </div>

          <div className="stat-item">
            📈 Win Rate
            <br />
            {stats.winRate}%
          </div>

          <div className="stat-item">
            💡 Hintlar
            <br />
            {stats.hintsUsed}
          </div>

          <div className="stat-item">
            ↩️ Undo
            <br />
            {stats.undosUsed}
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            color: "#cbd5e1"
          }}
        >
          <p>
            🥉 Easy: {stats.bestEasy || "--:--"}
          </p>

          <p>
            🥈 Medium: {stats.bestMedium || "--:--"}
          </p>

          <p>
            🥇 Hard: {stats.bestHard || "--:--"}
          </p>

          <p>
            🎖 Rank: {stats.rank}
          </p>
        </div>

        <button
          className="newgame"
          onClick={onClose}
        >
          Yopish
        </button>
      </div>
    </div>
  );
            }

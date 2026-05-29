import "../styles/home.css";

export default function HomePage({
  setPage
}) {
  return (
    <div className="home-page">

      <div className="hero-card">

        <div className="hero-logo">
          🎮
        </div>

        <h1 className="hero-title">
          BOLISH GAMES
        </h1>

        <p className="hero-subtitle">
          Premium Puzzle Platform
        </p>

      </div>

      <div className="profile-card">

        <div className="profile-item">
          <span>🏆 Reyting</span>
          <strong>1250</strong>
        </div>

        <div className="profile-item">
          <span>🌍 TOP</span>
          <strong>#87</strong>
        </div>

      </div>

      <button
        className="menu-btn primary"
        onClick={() =>
          setPage("games")
        }
      >
        🎲 O‘yinlar
      </button>

      <button
        className="menu-btn secondary"
        onClick={() =>
          setPage("rating")
        }
      >
        🏆 Reyting
      </button>

      <div className="news-card">

        <h3>
          🔥 So‘nggi yangiliklar
        </h3>

        <p>
          Sudoku reyting tizimi
          ishlab chiqilmoqda.
        </p>

      </div>

    </div>
  );
}

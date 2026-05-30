import "../styles/home.css";

export default function HomePage({ setPage }) {
  return (
    <div className="home-page">

      <div className="hero-card">
        <div className="logo">🎮</div>

        <h1>Bolish Games</h1>

        <p>
          Premium mini o‘yinlar platformasi
        </p>

        <button
          className="play-btn"
          onClick={() => setPage("games")}
        >
          O‘yinlarni ochish →
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>1</h2>
          <span>O‘yin</span>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <span>Rekord</span>
        </div>

        <div className="stat-card">
          <h2>∞</h2>
          <span>Imkoniyat</span>
        </div>

      </div>

    </div>
  );
}

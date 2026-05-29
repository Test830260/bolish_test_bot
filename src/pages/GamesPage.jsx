import { useNavigate } from "react-router-dom";

export default function GamesPage() {
  const navigate = useNavigate();

  return (
    <div className="games-page">

      <div className="page-header">
        <h1>🎮 O'yinlar</h1>
        <p>
          Mavjud o'yinlar katalogi
        </p>
      </div>

      <div
        className="game-card"
        onClick={() =>
          navigate("/sudoku")
        }
      >
        <div className="game-icon">
          🧩
        </div>

        <div className="game-info">
          <h2>Sudoku</h2>

          <p>
            Mantiqiy boshqotirma
          </p>

          <div className="game-tags">
            <span>
              ⭐ Reyting
            </span>

            <span>
              🏆 Top 100
            </span>

            <span>
              ⚡ Online
            </span>
          </div>
        </div>

        <div className="play-arrow">
          ▶
        </div>
      </div>

      <div className="coming-section">

        <h2>
          🚀 Tez kunda
        </h2>

        <div className="coming-grid">

          <div className="coming-card">
            ♟️ Shaxmat
          </div>

          <div className="coming-card">
            ❌ XO
          </div>

          <div className="coming-card">
            🃏 Durak
          </div>

          <div className="coming-card">
            🀄 Mahjong
          </div>

        </div>
      </div>

    </div>
  );
}

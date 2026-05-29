import "../styles/sudokuPage.css";

export default function SudokuPage({
setPage
}) {
return (
<div className="sudoku-page">

  <div className="sudoku-hero">

    <div className="sudoku-icon">
      🧩
    </div>

    <h1>
      Sudoku
    </h1>

    <p>
      Mantiqiy fikrlashni
      rivojlantiruvchi
      premium boshqotirma
    </p>

  </div>

  <div className="profile-card">

    <div className="profile-item">
      <span>
        ⭐ Reyting
      </span>

      <strong>
        1250
      </strong>
    </div>

    <div className="profile-item">
      <span>
        🌍 TOP
      </span>

      <strong>
        #87
      </strong>
    </div>

  </div>

  <div className="best-times">

    <h3>
      🏆 Eng yaxshi natijalar
    </h3>

    <div className="time-card">
      🥉 Oson:
      01:12
    </div>

    <div className="time-card">
      🥈 O'rta:
      03:44
    </div>

    <div className="time-card">
      🥇 Qiyin:
      07:21
    </div>

  </div>

  <button
    className="play-btn"
    onClick={() =>
      setPage("play")
    }
  >
    ▶ O'YNASH
  </button>

  <button
    className="stats-btn"
    onClick={() =>
      setPage("games")
    }
  >
    ⬅ Orqaga
  </button>

</div>

);
}

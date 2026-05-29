import "../styles/rating.css";

export default function RatingPage({
setPage
}) {

const players = [
{
name: "Ali",
score: 5420
},
{
name: "Bek",
score: 5301
},
{
name: "John",
score: 5220
},
{
name: "Alex",
score: 5105
},
{
name: "Sam",
score: 5050
}
];

return (
<div className="rating-page">

  <div className="page-header">
    <h1>
      🏆 TOP 100
    </h1>

    <p>
      Eng kuchli
      o'yinchilar
    </p>
  </div>

  <div className="rank-card">

    <div className="rank-item">
      <span>
        🌍 O'rin
      </span>

      <strong>
        #87
      </strong>
    </div>

    <div className="rank-item">
      <span>
        ⭐ Reyting
      </span>

      <strong>
        1250
      </strong>
    </div>

  </div>

  <div className="leaderboard">

    {players.map(
      (
        player,
        index
      ) => (
        <div
          key={index}
          className="player-card"
        >

          <div>
            #{index + 1}
          </div>

          <div>
            {player.name}
          </div>

          <div>
            {player.score}
          </div>

        </div>
      )
    )}

  </div>

  <button
    className="stats-btn"
    onClick={() =>
      setPage("home")
    }
  >
    ⬅ Orqaga
  </button>

</div>

);
}

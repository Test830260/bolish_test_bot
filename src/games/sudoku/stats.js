import { getRating } from "./rating";

export function getStats() {
  const rating = getRating();

  const totalGames =
    rating.wins + rating.losses;

  const winRate =
    totalGames === 0
      ? 0
      : Math.round(
          (rating.wins / totalGames) * 100
        );

  return {
    points: rating.points,

    wins: rating.wins,
    losses: rating.losses,

    totalGames,
    winRate,

    hintsUsed: rating.hintsUsed,
    undosUsed: rating.undosUsed,

    bestEasy: rating.bestEasy,
    bestMedium: rating.bestMedium,
    bestHard: rating.bestHard,

    rank: getRank(rating.points)
  };
}

function getRank(points) {
  if (points >= 3000) return "💎 Diamond";
  if (points >= 2000) return "🏆 Platinum";
  if (points >= 1500) return "🥇 Gold";
  if (points >= 1200) return "🥈 Silver";

  return "🥉 Bronze";
}

export function formatTime(seconds) {
  if (!seconds) return "--:--";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

const DEFAULT_RATING = {
  points: 1000,
  wins: 0,
  losses: 0,
  hintsUsed: 0,
  undosUsed: 0,
  bestEasy: null,
  bestMedium: null,
  bestHard: null
};

export function getRating() {
  const data = localStorage.getItem("sudoku_rating");

  if (!data) {
    return DEFAULT_RATING;
  }

  return JSON.parse(data);
}

export function saveRating(data) {
  localStorage.setItem(
    "sudoku_rating",
    JSON.stringify(data)
  );
}

export function addWin(level, seconds) {
  const rating = getRating();

  rating.wins++;

  let reward = 50;

  if (level === "medium") reward = 100;
  if (level === "hard") reward = 200;

  rating.points += reward;

  if (
    level === "easy" &&
    (!rating.bestEasy || seconds < rating.bestEasy)
  ) {
    rating.bestEasy = seconds;
  }

  if (
    level === "medium" &&
    (!rating.bestMedium || seconds < rating.bestMedium)
  ) {
    rating.bestMedium = seconds;
  }

  if (
    level === "hard" &&
    (!rating.bestHard || seconds < rating.bestHard)
  ) {
    rating.bestHard = seconds;
  }

  saveRating(rating);

  return rating;
}

export function addLoss() {
  const rating = getRating();

  rating.losses++;
  rating.points = Math.max(
    0,
    rating.points - 30
  );

  saveRating(rating);

  return rating;
}

export function useHintPenalty() {
  const rating = getRating();

  rating.hintsUsed++;
  rating.points = Math.max(
    0,
    rating.points - 15
  );

  saveRating(rating);

  return rating;
}

export function useUndoPenalty() {
  const rating = getRating();

  rating.undosUsed++;
  rating.points = Math.max(
    0,
    rating.points - 10
  );

  saveRating(rating);

  return rating;
}

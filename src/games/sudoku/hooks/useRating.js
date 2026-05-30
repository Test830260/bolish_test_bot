import { useEffect, useState } from "react";

const START_RATING = 1200;

export default function useRating() {

  const [score, setScore] = useState(() => {
    const saved =
      localStorage.getItem("sudoku_rating");

    return saved
      ? Number(saved)
      : START_RATING;
  });

  const [streak, setStreak] = useState(() => {
    const saved =
      localStorage.getItem("sudoku_streak");

    return saved
      ? Number(saved)
      : 0;
  });

  useEffect(() => {
    localStorage.setItem(
      "sudoku_rating",
      score
    );
  }, [score]);

  useEffect(() => {
    localStorage.setItem(
      "sudoku_streak",
      streak
    );
  }, [streak]);

  function addCorrectMove() {
    setScore(prev => prev + 10);
  }

  function addMistake() {
    setScore(prev =>
      Math.max(0, prev - 20)
    );
  }

  function useHintPenalty() {
    setScore(prev =>
      Math.max(0, prev - 35)
    );
  }

  function useUndoPenalty() {
    setScore(prev =>
      Math.max(0, prev - 15)
    );
  }

  function addWin({
    level,
    seconds,
    errors,
    hintsUsed,
    undosUsed
  }) {

    let reward = 0;

    // Difficulty

    if (level === "easy")
      reward += 100;

    if (level === "medium")
      reward += 200;

    if (level === "hard")
      reward += 350;

    // Time bonus

    if (level === "easy") {

      if (seconds <= 180)
        reward += 50;
      else if (seconds <= 300)
        reward += 25;

    } else if (
      level === "medium"
    ) {

      if (seconds <= 360)
        reward += 75;
      else if (seconds <= 600)
        reward += 35;

    } else if (
      level === "hard"
    ) {

      if (seconds <= 600)
        reward += 120;
      else if (seconds <= 900)
        reward += 60;
    }

    // Perfect game

    if (
      errors === 0 &&
      hintsUsed === 0 &&
      undosUsed === 0
    ) {
      reward += 150;
    }

    // Streak bonus

    let nextStreak =
      streak + 1;

    setStreak(nextStreak);

    if (nextStreak >= 10)
      reward += 250;
    else if (nextStreak >= 5)
      reward += 100;
    else if (nextStreak >= 3)
      reward += 50;

    setScore(prev =>
      prev + reward
    );
  }

  function addLoss() {

    setStreak(0);

    setScore(prev =>
      Math.max(
        0,
        prev - 100
      )
    );
  }

  function abandonGame(
    filled
  ) {

    setStreak(0);

    if (filled >= 40) {
      setScore(prev =>
        Math.max(
          0,
          prev - 25
        )
      );
    } else {
      setScore(prev =>
        Math.max(
          0,
          prev - 50
        )
      );
    }
  }

  function resetRating() {

    setScore(
      START_RATING
    );

    setStreak(0);

    localStorage.removeItem(
      "sudoku_rating"
    );

    localStorage.removeItem(
      "sudoku_streak"
    );
  }

  function getRank() {

    if (score >= 6000)
      return "🔥 Master";

    if (score >= 4000)
      return "👑 Diamond";

    if (score >= 2500)
      return "💎 Platinum";

    if (score >= 1500)
      return "🥇 Gold";

    if (score >= 1000)
      return "🥈 Silver";

    return "🥉 Bronze";
  }

  return {

    score,
    streak,

    addCorrectMove,
    addMistake,

    useHintPenalty,
    useUndoPenalty,

    addWin,
    addLoss,
    abandonGame,

    resetRating,

    getRank
  };
}

import { useState } from "react";

export default function useRating() {
  const [score, setScore] =
    useState(1000);

  function addCorrectMove() {
    setScore(prev => prev + 10);
  }

  function addWin(level) {
    let bonus = 100;

    if (level === "medium") {
      bonus = 200;
    }

    if (level === "hard") {
      bonus = 350;
    }

    setScore(prev => prev + bonus);
  }

  function addMistake() {
    setScore(prev =>
      Math.max(0, prev - 30)
    );
  }

  function useHintPenalty() {
    setScore(prev =>
      Math.max(0, prev - 25)
    );
  }

  function useUndoPenalty() {
    setScore(prev =>
      Math.max(0, prev - 15)
    );
  }

  function resetRating() {
    setScore(1000);
  }

  function getRank() {
    if (score >= 5000)
      return "👑 Master";

    if (score >= 3500)
      return "💎 Diamond";

    if (score >= 2500)
      return "🏆 Platinum";

    if (score >= 1800)
      return "🥇 Gold";

    if (score >= 1300)
      return "🥈 Silver";

    return "🥉 Bronze";
  }

  return {
    score,
    setScore,

    addCorrectMove,
    addWin,

    addMistake,

    useHintPenalty,
    useUndoPenalty,

    resetRating,

    getRank
  };
        }

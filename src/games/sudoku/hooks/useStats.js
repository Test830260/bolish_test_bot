import { useEffect, useState } from "react";

const DEFAULT_STATS = {
  wins: 0,
  losses: 0,
  totalGames: 0,

  bestEasy: null,
  bestMedium: null,
  bestHard: null,

  hintsUsed: 0,
  undosUsed: 0
};

export default function useStats() {
  const [stats, setStats] =
    useState(DEFAULT_STATS);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "sudoku_stats"
      );

    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sudoku_stats",
      JSON.stringify(stats)
    );
  }, [stats]);

  function addWin(
    level,
    seconds
  ) {
    setStats(prev => {
      const next = {
        ...prev,

        wins: prev.wins + 1,

        totalGames:
          prev.totalGames + 1
      };

      if (
        level === "easy" &&
        (!next.bestEasy ||
          seconds <
            next.bestEasy)
      ) {
        next.bestEasy = seconds;
      }

      if (
        level === "medium" &&
        (!next.bestMedium ||
          seconds <
            next.bestMedium)
      ) {
        next.bestMedium =
          seconds;
      }

      if (
        level === "hard" &&
        (!next.bestHard ||
          seconds <
            next.bestHard)
      ) {
        next.bestHard = seconds;
      }

      return next;
    });
  }

  function addLoss() {
    setStats(prev => ({
      ...prev,

      losses:
        prev.losses + 1,

      totalGames:
        prev.totalGames +

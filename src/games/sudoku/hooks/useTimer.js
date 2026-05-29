import { useEffect, useState } from "react";

export default function useTimer(
  gameOver,
  victory
) {
  const [seconds, setSeconds] =
    useState(0);

  useEffect(() => {
    if (gameOver || victory) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, victory]);

  function resetTimer() {
    setSeconds(0);
  }

  function formatTime() {
    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  return {
    seconds,
    setSeconds,
    resetTimer,
    formatTime
  };
}

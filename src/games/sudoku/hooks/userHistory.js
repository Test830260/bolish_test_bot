import { useState } from "react";

export default function useHistory() {
  const [history, setHistory] =
    useState([]);

  const [redoStack, setRedoStack] =
    useState([]);

  function saveMove(board) {
    setHistory(prev => [
      ...prev,
      board.map(row => [...row])
    ]);

    setRedoStack([]);
  }

  function undo(board) {
    if (history.length === 0) {
      return board;
    }

    const previous =
      history[history.length - 1];

    setRedoStack(prev => [
      ...prev,
      board.map(row => [...row])
    ]);

    setHistory(prev =>
      prev.slice(0, -1)
    );

    return previous;
  }

  function redo(board) {
    if (redoStack.length === 0) {
      return board;
    }

    const next =
      redoStack[redoStack.length - 1];

    setHistory(prev => [
      ...prev,
      board.map(row => [...row])
    ]);

    setRedoStack(prev =>
      prev.slice(0, -1)
    );

    return next;
  }

  function clearHistory() {
    setHistory([]);
    setRedoStack([]);
  }

  return {
    saveMove,
    undo,
    redo,
    clearHistory,
    historyCount: history.length,
    redoCount: redoStack.length
  };
  }

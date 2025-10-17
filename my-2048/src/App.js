import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { initializeBoard, move } from "./gameLogic";
import "./styles/Game.css";

const App = () => {
  const [boardSize, setBoardSize] = useState(4); // Configurable board size
  const [board, setBoard] = useState(initializeBoard(boardSize));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    if (gameOver) return;
    const { newBoard, newScore, isGameOver } = move(board, e.key, score);
    setBoard(newBoard);
    setScore(newScore);
    setGameOver(isGameOver);

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("highScore", newScore);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const restartGame = () => {
    setBoard(initializeBoard(boardSize));
    setScore(0);
    setGameOver(false);
  };

  const changeBoardSize = (size) => {
    setBoardSize(size);
    setBoard(initializeBoard(size));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>2048</h1>
      <div className="info">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
      <div className="board-size-selector">
        <label>
          Board Size: 
          <select
            value={boardSize}
            onChange={(e) => changeBoardSize(parseInt(e.target.value))}
          >
            <option value={3}>3×3</option>
            <option value={4}>4×4</option>
            <option value={5}>5×5</option>
            <option value={6}>6×6</option>
          </select>
        </label>
      </div>
      <Board board={board} />
      {gameOver && <div className="overlay">Game Over!</div>}
    </div>
  );
};

export default App;

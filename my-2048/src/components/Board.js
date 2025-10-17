import React from "react";
import Tile from "./Tile";

const Board = ({ board }) => {
  const size = board.length;
  const tileSize = Math.floor(400 / size); // make tiles fit a 400px board width

  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${size}, ${tileSize}px)`,
        gap: "10px",
        margin: "20px auto",
      }}
    >
      {board.map((row, i) =>
        row.map((value, j) => (
          <Tile key={`${i}-${j}`} value={value} size={tileSize} />
        ))
      )}
    </div>
  );
};

export default Board;

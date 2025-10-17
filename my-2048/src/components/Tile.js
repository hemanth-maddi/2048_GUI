import React from "react";

const Tile = ({ value, size }) => {
  return (
    <div
      className={`tile value-${value}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 3}px`, // scale font with tile
      }}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;

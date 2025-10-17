import React from "react";

const Controls = ({ onMove }) => {
  return (
    <div className="mt-4 flex gap-2 items-center">
      <button onClick={() => onMove("up")} className="px-3 py-2 bg-gray-800 text-white rounded">↑</button>
      <button onClick={() => onMove("left")} className="px-3 py-2 bg-gray-800 text-white rounded">←</button>
      <button onClick={() => onMove("down")} className="px-3 py-2 bg-gray-800 text-white rounded">↓</button>
      <button onClick={() => onMove("right")} className="px-3 py-2 bg-gray-800 text-white rounded">→</button>
      <div className="ml-4 text-sm text-gray-600">Use arrow keys or WASD. Swipe on mobile. Tiles merge when equal.</div>
    </div>
  );
};

export default Controls;

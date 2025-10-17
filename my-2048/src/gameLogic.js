export const initializeBoard = (size = 4) => {
  const newBoard = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  addRandomTile(newBoard);
  addRandomTile(newBoard);
  return newBoard;
};

const addRandomTile = (board) => {
  const emptyCells = [];
  board.forEach((row, i) =>
    row.forEach((cell, j) => cell === 0 && emptyCells.push([i, j]))
  );

  if (emptyCells.length > 0) {
    const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
};

export const move = (board, direction, score) => {
  let rotated = board.map((row) => [...row]);
  let newScore = score;

  const size = board.length;

  const rotateClockwise = (b) =>
    b[0].map((_, i) => b.map((r) => r[i]).reverse());
  const rotateCounter = (b) =>
    b[0].map((_, i) => b.map((r) => r[r.length - 1 - i]));

  const slide = (row) => {
    let arr = row.filter((v) => v);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        newScore += arr[i];
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter((v) => v);
    while (arr.length < size) arr.push(0);
    return arr;
  };

  const applyMove = (b) => b.map(slide);

  if (direction === "ArrowLeft") rotated = applyMove(rotated);
  if (direction === "ArrowRight")
    rotated = applyMove(rotated.map((r) => r.reverse())).map((r) => r.reverse());
  if (direction === "ArrowUp")
    rotated = rotateCounter(applyMove(rotateClockwise(rotated)));
  if (direction === "ArrowDown")
    rotated = rotateClockwise(applyMove(rotateCounter(rotated)));

  if (JSON.stringify(board) !== JSON.stringify(rotated)) addRandomTile(rotated);

  const isGameOver = checkGameOver(rotated);
  return { newBoard: rotated, newScore, isGameOver };
};

const checkGameOver = (board) => {
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) return false;
      if (i < size - 1 && board[i][j] === board[i + 1][j]) return false;
      if (j < size - 1 && board[i][j] === board[i][j + 1]) return false;
    }
  }
  return true;
};

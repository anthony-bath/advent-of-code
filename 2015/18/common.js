export function getOnNeighborCount(x, y, grid) {
  const deltas = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];

  let count = 0;

  for (const [dx, dy] of deltas) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX < 0 || nextY < 0 || nextX >= 100 || nextY >= 100) continue;

    if (grid[nextY][nextX] === '#') count++;
  }

  return count;
}

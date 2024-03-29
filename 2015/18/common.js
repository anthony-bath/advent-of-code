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

  const W = grid[0].length;
  const H = grid.length;

  let count = 0;

  for (const [dx, dy] of deltas) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX < 0 || nextY < 0 || nextX >= W || nextY >= H) continue;

    if (grid[nextY][nextX] === '#') count++;
  }

  return count;
}

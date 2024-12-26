export const ACRE_TYPE = {
  OPEN: '.',
  TREES: '|',
  LUMBERYARD: '#',
};

export function getAdjacents(x, y, grid) {
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

  return deltas.map(([dx, dy]) => {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX < 0 || nextX >= grid[0].length) {
      return null;
    }

    if (nextY < 0 || nextY >= grid.length) {
      return null;
    }

    return grid[nextY][nextX];
  });
}

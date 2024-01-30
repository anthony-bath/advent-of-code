export function part1({ grid }) {
  let start;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'S') {
        start = { x, y };
        break;
      }
    }
  }

  const deltas = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const distance = Array(grid.length)
    .fill()
    .map(() => Array(grid[0].length).fill(Infinity));

  distance[start.y][start.x] = 0;

  const queue = [[start.x, start.y]];

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (const [dx, dy] of deltas) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) {
        continue;
      }

      if (grid[ny][nx] === '#') {
        continue;
      }

      if (distance[cy][cx] + 1 < distance[ny][nx]) {
        distance[ny][nx] = distance[cy][cx] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  let points = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (distance[y][x] <= 64 && distance[y][x] % 2 === 0) {
        points++;
      }
    }
  }

  return points;
}

import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 2];

const grid = read(YEAR, DAY, PART).map((line) => line.split(''));
const W = grid[0].length;
const H = grid.length;

const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const start = [1, 0];
const [ex, ey] = [W - 2, H - 1];

const junctions = [start, [ex, ey]];

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (grid[y][x] === '#') continue;

    let count = 0;

    for (const [dx, dy] of deltas) {
      const [nx, ny] = [x + dx, y + dy];

      if (nx < 0 || nx >= W || ny < 0 || ny >= H || grid[ny][nx] === '#') continue;

      count++;
    }

    if (count >= 3) {
      junctions.push([x, y]);
    }
  }
}

const graph = new Map(junctions.map((junction) => [junction.join(','), new Map()]));

for (const [x, y] of junctions) {
  const stack = [[x, y, 0]];
  const key = `${x},${y}`;
  const seen = new Set([key]);

  while (stack.length) {
    const [sx, sy, distance] = stack.pop();

    const junction = junctions.find(([x, y]) => x === sx && y === sy);

    if (distance > 0 && junction) {
      const [jx, jy] = junction;
      graph.get(key).set(`${jx},${jy}`, distance);
      continue;
    }

    for (const [dx, dy] of deltas) {
      const [nx, ny] = [sx + dx, sy + dy];
      const key = `${nx},${ny}`;

      if (nx < 0 || nx >= W || ny < 0 || ny >= H || grid[ny][nx] === '#' || seen.has(key)) continue;

      stack.push([nx, ny, distance + 1]);
      seen.add(key);
    }
  }
}

const seen = new Set();
let callCount = 0;

function dfs([sx, sy]) {
  console.log(callCount++);
  if (sx === ex && sy === ey) return 0;

  let max = -Infinity;

  for (const [key, distance] of graph.get(`${sx},${sy}`)) {
    if (seen.has(key)) continue;

    seen.add(key);
    const [nx, ny] = key.split(',').map(Number);
    max = Math.max(max, dfs([nx, ny]) + distance);
    seen.delete(key);
  }

  return max;
}

write(YEAR, DAY, PART, dfs(start));

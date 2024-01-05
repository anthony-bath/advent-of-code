import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 2];

const grid = readOld(YEAR, DAY, PART).map((line) => line.split(''));
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

const coordsByBit = new Map(junctions.map((junction, i) => [BigInt(2 ** i), junction]));
const graph = new Map(junctions.map((_, i) => [BigInt(2 ** i), new Map()]));

for (const [bit, [x, y]] of coordsByBit) {
  const stack = [[x, y, 0]];
  const key = `${x},${y}`;
  const seen = new Set([key]);

  while (stack.length) {
    const [sx, sy, distance] = stack.pop();

    const junction = junctions.findIndex(([x, y]) => x === sx && y === sy);

    if (distance > 0 && junction !== -1) {
      graph.get(bit).set(BigInt(2 ** junction), distance);
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

let seen = 0n;

function dfs(bit) {
  if (bit === 2n) return 0;

  let max = -Infinity;

  for (const [jBit, distance] of graph.get(bit)) {
    if (seen & jBit) continue;

    seen |= jBit;
    max = Math.max(max, dfs(jBit) + distance);
    seen ^= jBit;
  }

  return max;
}

write(YEAR, DAY, PART, dfs(1n));

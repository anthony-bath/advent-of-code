import { readOld, write } from '../../utilities/io.js';
import { knotHash } from './common.js';

const [YEAR, DAY, PART] = [2017, 14, 1];

const lengths = [...readOld(YEAR, DAY, PART, { splitBy: null }).trim()]
  .map((c) => c.charCodeAt(0))
  .concat('-'.charCodeAt(0));

const suffix = [17, 31, 73, 47, 23];

const grid = [];

for (let row = 0; row < 128; row++) {
  const rowLengths = [...`${row}`].map((c) => c.charCodeAt(0));
  const input = [...lengths, ...rowLengths, ...suffix];
  const hash = knotHash(input);

  grid.push([...hash]);
}

const neighborDeltas = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array(128)
  .fill()
  .map((_) => Array(128).fill(0));

let groups = 0;

for (let y = 0; y < 128; y++) {
  for (let x = 0; x < 128; x++) {
    if (grid[y][x] === '0' || visited[y][x]) continue;

    //hit a unvisited cell that is a 1, must be a new group
    visited[y][x] = 1;
    groups++;

    // search out for all adjacent 1s and mark as visited
    const queue = [[x, y]];

    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (const [dx, dy] of neighborDeltas) {
        const nextX = cx + dx;
        const nextY = cy + dy;

        if (nextX < 0 || nextY < 0 || nextX > 127 || nextY > 127) continue;
        if (grid[nextY][nextX] === '0') continue;
        if (visited[nextY][nextX]) continue;

        queue.push([nextX, nextY]);
        visited[nextY][nextX] = 1;
      }
    }
  }
}

write(YEAR, DAY, PART, groups);

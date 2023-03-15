import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 22, 2];

const WIDTH = 30;
const HEIGHT = 35;

const grid = Array(HEIGHT)
  .fill()
  .map(() =>
    Array(WIDTH)
      .fill()
      .map(() => [])
  );

const expr = /\d+/g;

read(YEAR, DAY, PART).forEach((line) => {
  const matches = line.match(expr);

  if (matches) {
    const [x, y, size, used, avail] = matches.map((n) => Number(n));
    grid[y][x] = used === 0 ? '_' : used > 400 ? '#' : '.';
  }
});

const state = { x: 4, y: 25, steps: 0 };
const queue = [state];
const visited = { [`4|25`]: 1 };
const deltas = [
  [0, -1],
  [1, 0],
  [-1, 0],
  [0, 1],
];

let distance = null;

while (queue.length) {
  const current = queue.shift();

  if (current.x === WIDTH - 2 && current.y === 0) {
    distance = current.steps;
    break;
  }

  for (const [dx, dy] of deltas) {
    const nextX = current.x + dx;
    const nextY = current.y + dy;

    if (nextX < 0 || nextX >= WIDTH || nextY < 0 || nextY >= HEIGHT) continue;

    const nextKey = `${nextX}|${nextY}`;

    if (!visited[nextKey] && grid[nextY][nextX] === '.') {
      queue.push({ x: nextX, y: nextY, steps: current.steps + 1 });
      visited[nextKey] = 1;
    }
  }
}

// Distance to move the empty drive to left of the goal
//   + 5 moves per node to get to the top left
//   + 1 more move for the final transfer

write(YEAR, DAY, PART, distance + 5 * (WIDTH - 2) + 1);

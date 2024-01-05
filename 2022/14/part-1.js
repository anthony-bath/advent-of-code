import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 14, 1];

const WIDTH = 531;
const HEIGHT = 182;
const ROCK = '#';
const SAND = 'o';
const AIR = '.';

const cave = [...Array(HEIGHT)].map((_) => Array(WIDTH).fill(AIR));

readOld(YEAR, DAY, PART).forEach((line) => {
  const points = line.split(' -> ').map((coords) => {
    const [x, y] = coords.split(',').map((n) => parseInt(n, 10));
    return { x, y };
  });

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    if (p1.x === p2.x) {
      // vertical line
      for (let j = Math.min(p1.y, p2.y); j <= Math.max(p1.y, p2.y); j++) {
        cave[j][p1.x] = ROCK;
      }
    } else {
      // horicontal line
      for (let j = Math.min(p1.x, p2.x); j <= Math.max(p1.x, p2.x); j++) {
        cave[p1.y][j] = ROCK;
      }
    }
  }
});

function getMoveDelta({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return null;
  }

  const down = cave[y + 1][x];
  const downLeft = cave[y + 1][x - 1];
  const downRight = cave[y + 1][x + 1];

  if (down === AIR) {
    return { xDelta: 0, yDelta: 1 };
  } else if (downLeft === AIR) {
    return { xDelta: -1, yDelta: 1 };
  } else if (downRight === AIR) {
    return { xDelta: 1, yDelta: 1 };
  }
}

function willMoveIntoTheAbyss({ x, y }) {
  return x + 1 >= WIDTH || x - 1 <= 0 || y + 1 >= HEIGHT;
}

let grainsOfSand = 0;
let grain = { x: 500, y: 0, atRest: false };

while (true) {
  if (grain.atRest) {
    grainsOfSand++;
    grain = { x: 500, y: 0, atRest: false };
    continue;
  }

  if (willMoveIntoTheAbyss(grain)) {
    break;
  }

  const moveDelta = getMoveDelta(grain);

  if (!moveDelta) {
    grain.atRest = true;
    continue;
  }

  cave[grain.y][grain.x] = AIR;

  const { xDelta, yDelta } = moveDelta;
  grain.x += xDelta;
  grain.y += yDelta;

  cave[grain.y][grain.x] = SAND;
}

write(YEAR, DAY, PART, grainsOfSand);

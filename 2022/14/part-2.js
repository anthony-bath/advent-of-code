import { write, readOld } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 14, 2];

const HEIGHT = 183;

const blockers = {};

function addBlocker(y, x) {
  if (!blockers[y]) {
    blockers[y] = {};
  }

  blockers[y][x] = 1;
}

readOld(YEAR, DAY, PART).forEach((line) => {
  const points = line.split(' -> ').map((coords) => {
    const [x, y] = coords.split(',').map((n) => parseInt(n, 10));
    return { x, y };
  });

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    if (p1.x === p2.x) {
      const min = Math.min(p1.y, p2.y);
      const max = Math.max(p1.y, p2.y);

      for (let j = min; j <= max; j++) {
        addBlocker(j, p1.x);
      }
    } else {
      const min = Math.min(p1.x, p2.x);
      const max = Math.max(p1.x, p2.x);

      for (let j = min; j <= max; j++) {
        addBlocker(p1.y, j);
      }
    }
  }
});

function getMoveDelta({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return null;
  }

  if (!blockers[y + 1]) {
    return { xDelta: 0, yDelta: 1 };
  }

  if (!blockers[y + 1][x]) {
    return { xDelta: 0, yDelta: 1 };
  } else if (!blockers[y + 1][x - 1]) {
    return { xDelta: -1, yDelta: 1 };
  } else if (!blockers[y + 1][x + 1]) {
    return { xDelta: 1, yDelta: 1 };
  }
}

let grain = { x: 500, y: 0 };
const path = [];
let grainCount = 0;

while (true) {
  const moveDelta = getMoveDelta(grain);

  if (!moveDelta) {
    addBlocker(grain.y, grain.x);
    grainCount++;

    if (grain.x === 500 && grain.y === 0) {
      break;
    }

    grain = path.pop();
    continue;
  }

  const { xDelta, yDelta } = moveDelta;
  path.push({ x: grain.x, y: grain.y });
  grain.x += xDelta;
  grain.y += yDelta;
}

write(YEAR, DAY, PART, grainCount);

import { write, read } from '../utility.js';

const HEIGHT = 183;

const rocks = new Set();

read(14).forEach((line) => {
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
        rocks.add(`${p1.x},${j}`);
      }
    } else {
      // horizontal line
      for (let j = Math.min(p1.x, p2.x); j <= Math.max(p1.x, p2.x); j++) {
        rocks.add(`${j},${p1.y}`);
      }
    }
  }
});

let grain = { x: 500, y: 0, atRest: false };
const grains = new Set();

while (true) {
  if (grain.atRest) {
    grains.add(`${grain.x},${grain.y}`);

    if (grain.x === 500 && grain.y === 0) {
      break;
    }

    grain = { x: 500, y: 0, atRest: false };
    continue;
  }

  const moveDelta = getMoveDelta(grain);

  if (!moveDelta) {
    grain.atRest = true;
    continue;
  }

  const { xDelta, yDelta } = moveDelta;
  grain.x += xDelta;
  grain.y += yDelta;
}

write(14, 2, `${grains.size}`);

function getMoveDelta({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return null;
  }

  const down = `${x},${y + 1}`;
  const downLeft = `${x - 1},${y + 1}`;
  const downRight = `${x + 1},${y + 1}`;

  if (!rocks.has(down) && !grains.has(down)) {
    return { xDelta: 0, yDelta: 1 };
  } else if (!rocks.has(downLeft) && !grains.has(downLeft)) {
    return { xDelta: -1, yDelta: 1 };
  } else if (!rocks.has(downRight) && !grains.has(downRight)) {
    return { xDelta: 1, yDelta: 1 };
  }
}

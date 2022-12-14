import { write, read } from '../utility.js';

const HEIGHT = 183;

const blockers = new Set();

console.time('Day 14 Part 2');
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
        blockers.add(`${p1.x},${j}`);
      }
    } else {
      // horizontal line
      for (let j = Math.min(p1.x, p2.x); j <= Math.max(p1.x, p2.x); j++) {
        blockers.add(`${j},${p1.y}`);
      }
    }
  }
});

let grain = { x: 500, y: 0, atRest: false };
//const grains = new Set();
const path = [];
let grainCount = 0;

while (true) {
  if (grain.atRest) {
    //grains.add(`${grain.x},${grain.y}`);
    blockers.add(`${grain.x},${grain.y}`);
    grainCount++;

    if (grain.x === 500 && grain.y === 0) {
      break;
    }

    const { x, y } = path.pop();
    grain = { x, y, atRest: false };
    continue;
  }

  const moveDelta = getMoveDelta(grain);

  if (!moveDelta) {
    grain.atRest = true;
    continue;
  }

  const { xDelta, yDelta } = moveDelta;
  path.push({ x: grain.x, y: grain.y });
  grain.x += xDelta;
  grain.y += yDelta;
}

console.timeEnd('Day 14 Part 2');

write(14, 2, `${grainCount}`);

function getMoveDelta({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return null;
  }

  const down = `${x},${y + 1}`;
  const downLeft = `${x - 1},${y + 1}`;
  const downRight = `${x + 1},${y + 1}`;

  if (!blockers.has(down)) {
    return { xDelta: 0, yDelta: 1 };
  } else if (!blockers.has(downLeft)) {
    return { xDelta: -1, yDelta: 1 };
  } else if (!blockers.has(downRight)) {
    return { xDelta: 1, yDelta: 1 };
  }
}

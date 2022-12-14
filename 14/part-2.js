import { output, read } from '../utility.js';

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
      for (let j = Math.min(p1.y, p2.y); j <= Math.max(p1.y, p2.y); j++) {
        rocks.add(`${p1.x},${j}`);
      }
    } else {
      for (let j = Math.min(p1.x, p2.x); j <= Math.max(p1.x, p2.x); j++) {
        rocks.add(`${j},${p1.y}`);
      }
    }
  }
});

let grain = { x: 500, y: 0, atRest: false };
const grains = new Set();

while (true) {
  if (!grain.atRest) {
    if (canMoveDirectlyDown(grain)) {
      grain.y++;
    } else if (canMoveDownLeft(grain)) {
      grain.y++;
      grain.x--;
    } else if (canMoveDownRight(grain)) {
      grain.y++;
      grain.x++;
    } else {
      grain.atRest = true;
    }
  } else {
    grains.add(`${grain.x},${grain.y}`);

    if (grain.x === 500 && grain.y === 0) {
      break;
    }

    grain = { x: 500, y: 0, atRest: false };
  }
}

function canMoveDirectlyDown({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return false;
  }

  if (rocks.has(`${x},${y + 1}`) || grains.has(`${x},${y + 1}`)) {
    return false;
  }

  return true;
}

function canMoveDownLeft({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return false;
  }

  if (rocks.has(`${x - 1},${y + 1}`) || grains.has(`${x - 1},${y + 1}`)) {
    return false;
  }

  return true;
}

function canMoveDownRight({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return false;
  }

  if (rocks.has(`${x + 1},${y + 1}`) || grains.has(`${x + 1},${y + 1}`)) {
    return false;
  }

  return true;
}

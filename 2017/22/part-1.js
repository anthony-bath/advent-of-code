import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 22, 1];

const grid = new Map();

readOld(YEAR, DAY, PART).forEach((line, y) => {
  line.split('').map((cell, x) => grid.set(`${x}|${y}`, cell));
});

function getGridValue(x, y) {
  const key = `${x}|${y}`;

  if (!grid.has(key)) {
    grid.set(key, '.');
  }

  return grid.get(key);
}

const DIR = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

const BURSTS = 10000;

let [x, y] = [12, 12];
let direction = DIR.NORTH;
let count = 0;

for (let burst = 0; burst < BURSTS; burst++) {
  const key = `${x}|${y}`;
  const current = getGridValue(x, y);

  if (current === '#') {
    direction = (direction + 1) % 4;
    grid.set(key, '.');
  } else {
    direction = direction - 1 >= 0 ? direction - 1 : DIR.WEST;
    grid.set(key, '#');
    count++;
  }

  switch (direction) {
    case DIR.NORTH:
      y--;
      break;

    case DIR.EAST:
      x++;
      break;

    case DIR.SOUTH:
      y++;
      break;

    case DIR.WEST:
      x--;
      break;
  }
}

write(YEAR, DAY, PART, count);

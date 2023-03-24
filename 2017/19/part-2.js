import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 19, 2];

const layout = read(YEAR, DAY, PART).map((line) => line.split(''));

const DIR = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

function move(x, y, dir) {
  if (layout[y][x] === '+') {
    if (layout[y - 1][x] === '|' && dir !== DIR.SOUTH) {
      return DIR.NORTH;
    }

    if (layout[y + 1][x] === '|' && dir !== DIR.NORTH) {
      return DIR.SOUTH;
    }

    if (layout[y][x - 1] === '-' && dir !== DIR.EAST) {
      return DIR.WEST;
    }

    if (layout[y][x + 1] === '-' && dir !== DIR.WEST) {
      return DIR.EAST;
    }
  }

  return dir;
}

let y = 0;
let x = layout[0].indexOf('|');
let direction = DIR.SOUTH;
let steps = 0;

while (true) {
  steps++;

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

  direction = move(x, y, direction);

  if (layout[y][x] == ' ') {
    break;
  }
}

write(YEAR, DAY, PART, steps);

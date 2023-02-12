import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 1, 1];

const DIR = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

function getNextDir(currentDir, turn) {
  switch (currentDir) {
    case DIR.NORTH:
      return turn === 'L' ? DIR.WEST : DIR.EAST;
    case DIR.EAST:
      return turn === 'L' ? DIR.NORTH : DIR.SOUTH;
    case DIR.SOUTH:
      return turn === 'L' ? DIR.EAST : DIR.WEST;
    case DIR.WEST:
      return turn === 'L' ? DIR.SOUTH : DIR.NORTH;
  }
}

let x = 0;
let y = 0;
let dir = DIR.NORTH;

read(YEAR, DAY, PART, { splitBy: ', ' }).forEach((movement) => {
  const turn = movement.substring(0, 1);
  const steps = Number(movement.slice(1));

  dir = getNextDir(dir, turn);

  switch (dir) {
    case DIR.NORTH:
      y += steps;
      break;
    case DIR.EAST:
      x += steps;
      break;
    case DIR.WEST:
      x -= steps;
      break;
    case DIR.SOUTH:
      y -= steps;
      break;
  }
});

write(YEAR, DAY, PART, Math.abs(x) + Math.abs(y));

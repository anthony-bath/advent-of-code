import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 1, 2];

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
const seen = { '0|0': 1 };
let result = null;

read(YEAR, DAY, PART, { splitBy: ', ' }).forEach((movement) => {
  if (result) return;

  const turn = movement.substring(0, 1);
  let steps = Number(movement.slice(1));

  dir = getNextDir(dir, turn);

  while (steps > 0) {
    switch (dir) {
      case DIR.NORTH:
        y += 1;
        break;
      case DIR.EAST:
        x += 1;
        break;
      case DIR.WEST:
        x -= 1;
        break;
      case DIR.SOUTH:
        y -= 1;
        break;
    }

    if (!result && `${x}|${y}` in seen) {
      result = Math.abs(x) + Math.abs(y);
    } else {
      seen[`${x}|${y}`] = 1;
    }

    steps--;
  }
});

write(YEAR, DAY, PART, result);

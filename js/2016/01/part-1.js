import { DIR, getNextDir } from './common.js';

export function part1({ data }) {
  let x = 0;
  let y = 0;
  let dir = DIR.NORTH;

  data.split(', ').forEach((movement) => {
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

  return Math.abs(x) + Math.abs(y);
}

import { DIR, getNextDir } from './common.js';

export function part2({ data }) {
  let x = 0;
  let y = 0;
  let dir = DIR.NORTH;
  const seen = { '0|0': 1 };
  let result = null;

  data.split(', ').forEach((movement) => {
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

  return result;
}

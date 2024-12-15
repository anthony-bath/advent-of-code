import { move, DIR } from './common.js';

export function part1({ lines }) {
  const layout = lines.map((line) => line.split(''));

  let y = 0;
  let x = layout[0].indexOf('|');
  let direction = DIR.SOUTH;
  const collected = [];

  while (true) {
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

    direction = move(x, y, direction, layout);

    if (/[A-Z]/.test(layout[y][x])) {
      collected.push(layout[y][x]);
    }

    if (layout[y][x] == ' ') {
      break;
    }
  }

  return collected.join('');
}

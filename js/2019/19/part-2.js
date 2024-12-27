import { execute } from '../IntCode_v2.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);

  function scan(x, y) {
    return execute({ pointer: 0, program: [...program], relativeBase: 0 }, [x, y]);
  }

  const startXByY = new Map();

  let y = 4;
  let result = null;

  while (true) {
    let x = startXByY.get(y - 1) ?? 0;

    while (!scan(x, y)) x++;
    startXByY.set(y, x);

    while (scan(x + 99, y)) {
      const fits = scan(x, y + 99) && scan(x + 99, y + 99);

      if (fits) {
        result = { x, y };
        break;
      }

      x++;
    }

    if (result) {
      break;
    }

    y++;
  }

  return result.x * 10000 + result.y;
}

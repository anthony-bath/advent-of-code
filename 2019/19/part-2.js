import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 19, 2];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

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

write(YEAR, DAY, PART, result.x * 10000 + result.y);

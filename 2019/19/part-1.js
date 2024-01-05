import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 19, 1];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

let count = 0;

for (let x = 0; x < 50; x++) {
  for (let y = 0; y < 50; y++) {
    const result = execute({ pointer: 0, program: [...program], relativeBase: 0 }, [x, y]);

    if (result === 1) count++;
  }
}

write(YEAR, DAY, PART, count);

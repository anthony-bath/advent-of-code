import { read, write } from '../../utility.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 13, 1];

const program = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

let output = [];
let blockCount = 0;

const state = { pointer: 0, program: [...program], relativeBase: 0 };

while (!state.halted) {
  const result = execute(state);

  output.push(result);

  if (output.length % 3 === 0) {
    if (output[output.length - 1] === 2) {
      blockCount++;
    }
  }
}

write(YEAR, DAY, PART, blockCount);

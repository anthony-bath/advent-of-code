import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 9, 1];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const state = { pointer: 0, program: [...program], relativeBase: 0 };
let result;

while (!state.halted) {
  const output = execute(state, [1]);

  if (output) {
    result = output;
  }
}

write(YEAR, DAY, PART, result);

import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 5, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const INPUT_VALUE = 1;
let output;

const state = { pointer: 0, program: [...program], halted: false };

while (!state.halted) {
  const result = execute(state, [INPUT_VALUE]);

  if (result !== null) {
    output = result;
  }
}

write(YEAR, DAY, PART, output);

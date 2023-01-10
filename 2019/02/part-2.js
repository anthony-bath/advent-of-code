import { read, write } from '../../utility.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 2, 2];

const TARGET = 19690720;

const input = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

let noun;
let verb;
let found = false;

for (noun = 0; noun < 99; noun++) {
  for (verb = 0; verb < 99; verb++) {
    const program = [...input];
    program[1] = noun;
    program[2] = verb;

    const state = { pointer: 0, program };
    execute(state);

    if (state.program[0] === TARGET) {
      found = true;
      break;
    }
  }

  if (found) {
    break;
  }
}

write(YEAR, DAY, PART, 100 * noun + verb);

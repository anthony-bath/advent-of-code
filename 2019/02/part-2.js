import { execute } from '../IntCode.js';

export function part2({ data }) {
  const TARGET = 19690720;
  const input = data.split(',').map(Number);

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

  return 100 * noun + verb;
}

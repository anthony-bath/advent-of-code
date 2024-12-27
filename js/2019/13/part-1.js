import { execute } from '../IntCode_v2.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

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

  return blockCount;
}

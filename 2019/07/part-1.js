import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';
import { permute } from '../../utilities/array.js';

const [YEAR, DAY, PART] = [2019, 7, 1];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

let max = -Infinity;

const phaseOrders = permute([0, 1, 2, 3, 4]);

for (const order of phaseOrders) {
  let result;

  for (const phase of order) {
    const state = { pointer: 0, program: [...program] };
    const inputs = [phase, result ?? 0];

    result = execute(state, inputs);
  }

  if (result > max) {
    max = result;
  }
}

write(YEAR, DAY, PART, max);

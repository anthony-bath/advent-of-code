import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';
import { permute } from '../../utilities/array.js';

const [YEAR, DAY, PART] = [2019, 7, 2];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

let max = -Infinity;

const phaseOrders = permute([5, 6, 7, 8, 9]);

for (const phaseOrder of phaseOrders) {
  const states = phaseOrder.map(() => ({
    program: [...program],
    halted: false,
    pointer: 0,
  }));

  let result;
  let amplifier = 0;
  const phased = [0, 0, 0, 0, 0];

  while (true) {
    const inputs = [];

    if (!phased[amplifier]) {
      inputs.push(phaseOrder[amplifier]);
      phased[amplifier] = 1;
    }

    inputs.push(result ?? 0);

    result = execute(states[amplifier], inputs);

    if (!result) {
      break;
    } else if (result > max) {
      max = result;
    }

    amplifier = ++amplifier % 5;
  }
}

write(YEAR, DAY, PART, max);

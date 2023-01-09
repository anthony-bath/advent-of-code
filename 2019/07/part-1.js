import { permute, read, write } from '../../utility.js';
import { execute } from './common.js';

const [YEAR, DAY, PART] = [2019, 7, 1];

const program = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

let max = -Infinity;

const phaseOrders = permute([0, 1, 2, 3, 4]);

for (const order of phaseOrders) {
  let result;

  for (const phase of order) {
    result = execute([...program], [phase, result ?? 0]);
  }

  if (result > max) {
    max = result;
  }
}

write(YEAR, DAY, PART, max);

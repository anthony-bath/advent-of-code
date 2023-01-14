import { write } from '../../utilities/io.js';
import { loadMonkeys } from './common.js';

const [YEAR, DAY, PART] = [2022, 11, 1];

const monkeys = loadMonkeys(PART);
const ROUNDS = 20;

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => monkey.turn());
}

const inspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);

write(YEAR, DAY, PART, inspections[0] * inspections[1]);

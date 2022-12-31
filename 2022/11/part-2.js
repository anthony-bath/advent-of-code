import { write } from '../../utility.js';
import { monkeys } from './common.js';

const [YEAR, DAY, PART] = [2022, 11, 2];

const ROUNDS = 10000;
const WORRY_LEVEL_SCALE_BY = monkeys.reduce((scale, monkey) => scale * monkey.testDivisibleBy, 1);

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => monkey.turn(WORRY_LEVEL_SCALE_BY));
}

const inspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);

write(YEAR, DAY, PART, inspections[0] * inspections[1]);

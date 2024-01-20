import { loadMonkeys } from './common.js';

export function part2({ lines }) {
  const monkeys = loadMonkeys(lines);
  const ROUNDS = 10000;
  const WORRY_LEVEL_SCALE_BY = monkeys.reduce((scale, monkey) => scale * monkey.testDivisibleBy, 1);

  for (let i = 0; i < ROUNDS; i++) {
    monkeys.forEach((monkey) => monkey.turn(WORRY_LEVEL_SCALE_BY));
  }

  const inspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);

  return inspections[0] * inspections[1];
}

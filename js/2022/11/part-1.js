import { loadMonkeys } from './common.js';

export function part1({ lines }) {
  const monkeys = loadMonkeys(lines);
  const ROUNDS = 20;

  for (let i = 0; i < ROUNDS; i++) {
    monkeys.forEach((monkey) => monkey.turn());
  }

  const inspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);

  return inspections[0] * inspections[1];
}

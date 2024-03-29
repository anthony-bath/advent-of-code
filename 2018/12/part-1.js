import { getInputElements } from './common.js';

export function part1({ lines }) {
  const { pots, rules } = getInputElements(lines);

  const GENERATIONS = 20;

  for (let generation = 1; generation <= GENERATIONS; generation++) {
    const keys = [...pots.keys()];
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const toUpdate = new Map();

    for (let key = min - 2; key <= max + 2; key++) {
      const value = parseInt(
        [
          pots.get(key - 2) ?? 0,
          pots.get(key - 1) ?? 0,
          pots.get(key) ?? 0,
          pots.get(key + 1) ?? 0,
          pots.get(key + 2) ?? 0,
        ].join(''),
        2
      );

      toUpdate.set(key, rules.get(value));
    }

    for (const [key, newPot] of toUpdate) {
      pots.set(key, newPot);
    }
  }

  let sum = 0;

  for (const [key, pot] of pots) {
    if (pot) {
      sum += key;
    }
  }

  return sum;
}

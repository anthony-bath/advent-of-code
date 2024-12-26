import { getInputElements } from './common.js';

export function part2({ lines }) {
  const { pots, rules } = getInputElements(lines);

  let lastSum = 0;
  let sum = 0;
  let generation = 1;

  const diffs = [];

  while (true) {
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

    sum = 0;

    for (const [key, pot] of pots) {
      if (pot) {
        sum += key;
      }
    }

    diffs.push(sum - lastSum);

    if (diffs.length > 3) {
      diffs.shift();
    }

    if (diffs[0] === diffs[1] && diffs[0] === diffs[2]) {
      break;
    }

    lastSum = sum;
    generation++;
  }

  return sum + (50000000000 - generation) * diffs[0];
}

import { getInputElements } from './common.js';

export function part2({ lines }) {
  const magnitudes = [];
  const fish = getInputElements(lines);

  for (const fish1 of fish) {
    for (const fish2 of fish) {
      magnitudes.push(fish1.add(fish2).magnitude());
    }
  }

  return Math.max(...magnitudes);
}

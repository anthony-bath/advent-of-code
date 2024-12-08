import { getInputElements } from './common.js';

export function part1({ lines }) {
  const { distances, targets } = getInputElements(lines);

  const state = { collected: 1, value: 0, distance: 0 };
  const queue = [state];
  let result = Infinity;
  const allCollected = Math.pow(2, Object.keys(targets).length) - 1;

  while (queue.length) {
    const current = queue.shift();

    if (current.collected === allCollected) {
      if (current.distance < result) {
        result = current.distance;
      }
    }

    for (const [target, distance] of Object.entries(distances[current.value])) {
      const targetValue = Math.pow(2, Number(target));

      if (!(current.collected & targetValue)) {
        queue.push({
          collected: current.collected | targetValue,
          value: target,
          distance: current.distance + distance,
        });
      }
    }
  }

  return result;
}

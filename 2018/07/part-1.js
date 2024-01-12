import { getSteps } from './common.js';

export function part1({ lines }) {
  const steps = getSteps(lines);
  const executionOrder = [];

  while (executionOrder.length < Object.keys(steps).length) {
    const available = [];

    for (const [step, dependencies] of Object.entries(steps)) {
      if (dependencies.length === 0 && !executionOrder.includes(step)) {
        available.push(step);
      }
    }

    available.sort();

    const execute = available.shift();

    for (const [, dependencies] of Object.entries(steps)) {
      const index = dependencies.indexOf(execute);

      if (index !== -1) {
        dependencies.splice(index, 1);
      }
    }

    executionOrder.push(execute);
  }

  return executionOrder.join('');
}

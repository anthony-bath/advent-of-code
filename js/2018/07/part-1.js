import { getSteps } from './common.js';

export function part1({ lines }) {
  const steps = getSteps(lines);
  const executionOrder = [];

  while (steps.size > 0) {
    const available = [];

    for (const [step, dependencies] of steps) {
      if (dependencies.length === 0 && !executionOrder.includes(step)) {
        available.push(step);
      }
    }

    available.sort();

    const execute = available.shift();
    steps.delete(execute);

    for (const [_, dependencies] of steps) {
      const index = dependencies.indexOf(execute);

      if (index !== -1) {
        dependencies.splice(index, 1);
      }
    }

    executionOrder.push(execute);
  }

  return executionOrder.join('');
}

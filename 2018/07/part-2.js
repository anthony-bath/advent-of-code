import { getSteps } from './common.js';

export function part2({ lines }) {
  const steps = getSteps(lines);

  const WORKERS = 5;
  const OFFSET = 60;
  const STEP_DURATION = [...Array(26).keys()].reduce(
    (durations, stepNumber) => ({
      ...durations,
      [String.fromCharCode(stepNumber + 65)]: OFFSET + 1 + stepNumber,
    }),
    {}
  );

  let time = 0;
  const inProgress = new Map();

  while (steps.size) {
    const justFinished = [];

    for (const [step, finishes] of inProgress) {
      if (finishes === time) {
        justFinished.push(step);
        inProgress.delete(step);

        for (const [_, dependencies] of steps) {
          const index = dependencies.indexOf(step);

          if (index !== -1) {
            dependencies.splice(index, 1);
          }
        }
      }
    }

    const available = [];

    for (const [step, dependencies] of steps) {
      if (dependencies.length === 0) {
        available.push(step);
      }
    }

    available.sort();

    while (inProgress.size < WORKERS && available.length) {
      const step = available.shift();
      steps.delete(step);
      inProgress.set(step, time + STEP_DURATION[step]);
    }

    time = Math.min(...inProgress.values());
  }

  return time;
}

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
  let inProgress = [];
  const completed = [];

  while (true) {
    const justFinished = [];

    for (const { step, finishes } of inProgress) {
      if (finishes === time) {
        justFinished.push(step);
        completed.push(step);
      }
    }

    if (completed.length === Object.keys(steps).length) break;

    inProgress = inProgress.filter((t) => !justFinished.includes(t.step));

    for (const dependencies of Object.values(steps)) {
      for (const step of justFinished) {
        const index = dependencies.indexOf(step);

        if (index !== -1) {
          dependencies.splice(index, 1);
        }
      }
    }

    const available = [];
    const inProgressSteps = inProgress.map((t) => t.step);

    for (const [step, dependencies] of Object.entries(steps)) {
      if (
        dependencies.length === 0 &&
        !completed.includes(step) &&
        !inProgressSteps.includes(step)
      ) {
        available.push(step);
      }
    }

    available.sort();

    while (available.length && inProgress.length < WORKERS) {
      const step = available.shift();
      inProgress.push({ step, finishes: time + STEP_DURATION[step] });
    }

    time = Math.min(...inProgress.map((t) => t.finishes));
  }

  return time;
}

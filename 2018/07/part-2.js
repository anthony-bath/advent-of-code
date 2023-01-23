import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 7, 2];

const steps = {};
const expr = /Step (?<dependency>[A-Z]) must be finished before step (?<step>[A-Z]) can begin/;

read(YEAR, DAY, PART).forEach((line) => {
  const { dependency, step } = line.match(expr).groups;

  if (!steps[dependency]) {
    steps[dependency] = [];
  }

  if (!steps[step]) {
    steps[step] = [];
  }

  steps[step].push(dependency);
});

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
    if (dependencies.length === 0 && !completed.includes(step) && !inProgressSteps.includes(step)) {
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

write(YEAR, DAY, PART, time);

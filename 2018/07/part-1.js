import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 7, 1];

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

write(YEAR, DAY, PART, executionOrder.join(''));

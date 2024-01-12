export function getSteps(lines) {
  const steps = {};
  const expr = /Step (?<dependency>[A-Z]) must be finished before step (?<step>[A-Z]) can begin/;

  lines.forEach((line) => {
    const { dependency, step } = line.match(expr).groups;

    if (!steps[dependency]) {
      steps[dependency] = [];
    }

    if (!steps[step]) {
      steps[step] = [];
    }

    steps[step].push(dependency);
  });

  return steps;
}

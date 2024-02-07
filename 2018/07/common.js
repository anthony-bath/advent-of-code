export function getSteps(lines) {
  const steps = new Map();
  const expr = /Step (?<dependency>[A-Z]) must be finished before step (?<step>[A-Z]) can begin/;

  lines.forEach((line) => {
    const { dependency, step } = line.match(expr).groups;

    if (!steps.has(dependency)) {
      steps.set(dependency, []);
    }

    if (!steps.has(step)) {
      steps.set(step, []);
    }

    steps.get(step).push(dependency);
  });

  return steps;
}

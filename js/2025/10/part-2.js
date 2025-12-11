import { init } from 'z3-solver';

// need to change the day runner to await part()

export async function part2({ lines, data }) {
  const { Context, em } = await init();
  const { Optimize, Int, Sum } = new Context('main');

  const machines = lines.map((line) => {
    const parts = line
      .replace(/[\[\]\{\}\(\)]/g, '')
      .split(' ')
      .slice(1);

    const buttons = parts.slice(0, parts.length - 1).map((part) => part.split(',').map(Number));
    const reqs = parts.at(-1).split(',').map(Number);

    return { reqs, buttons };
  });

  let total = 0;

  for (const { reqs, buttons } of machines) {
    const conditions = reqs.map((req, counter) => ({
      affectingButtons: buttons
        .map((b, i) => ({ b, i }))
        .filter(({ b }) => b.includes(counter))
        .map(({ i }) => i),
      joltage: req,
    }));

    const solver = new Optimize();
    const variables = buttons.map((_, i) => Int.const(`b${i}`));

    for (const { affectingButtons, joltage } of conditions) {
      const equation = affectingButtons.reduce(
        (equation, varIndex) => equation.add(variables[varIndex]),
        Int.val(0)
      );

      solver.add(equation.eq(Int.val(joltage)));
    }

    variables.forEach((variable) => solver.add(variable.ge(Int.val(0))));
    solver.minimize(Sum(...variables));

    const result = await solver.check();

    if (result !== 'sat') {
      throw new Error('Unsatisfiable');
    }

    const model = solver.model();
    total += variables.reduce((total, variable) => total + Number(model.eval(variable).value()), 0);
  }

  em.PThread.terminateAllThreads();

  return total;
}

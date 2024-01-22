export function part1({ lines }) {
  const jobByMonkey = new Map();

  lines.forEach((line) => {
    const [monkey, job] = line.split(': ');
    jobByMonkey.set(monkey, /\d+/.test(job) ? Number(job) : job);
  });

  function operate(lhs, operation, rhs) {
    switch (operation) {
      case '+':
        return lhs + rhs;
      case '-':
        return lhs - rhs;
      case '*':
        return lhs * rhs;
      case '/':
        return lhs / rhs;
    }
  }

  function evaluate(monkey) {
    const job = jobByMonkey.get(monkey);

    if (Number.isInteger(job)) {
      return job;
    }

    const [monkey1, operation, monkey2] = job.split(' ');

    return operate(evaluate(monkey1), operation, evaluate(monkey2));
  }

  return evaluate('root');
}

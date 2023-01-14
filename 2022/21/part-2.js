import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 21, 2];

const jobByMonkey = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [monkey, job] = line.split(': ');
  jobByMonkey.set(monkey, /\d+/.test(job) ? { real: Number(job), imag: 0 } : job);

  if (monkey === 'humn') {
    jobByMonkey.set(monkey, { real: 0, imag: 1 });
  }
});

function operate(lhs, operation, rhs) {
  switch (operation) {
    case '+':
      return {
        real: lhs.real + rhs.real,
        imag: lhs.imag + rhs.imag,
      };
    case '-':
      return {
        real: lhs.real - rhs.real,
        imag: lhs.imag - rhs.imag,
      };
    case '*':
      return {
        real: lhs.real * rhs.real - lhs.imag * rhs.imag,
        imag: lhs.real * rhs.imag + lhs.imag * rhs.real,
      };
    case '/':
      const denominator = Math.pow(rhs.real, 2) + Math.pow(rhs.imag, 2);

      return {
        real: (lhs.real * rhs.real + lhs.imag * rhs.imag) / denominator,
        imag: (lhs.imag * rhs.real - lhs.real * rhs.imag) / denominator,
      };
  }
}

function evaluate(monkey, queue) {
  const job = jobByMonkey.get(monkey);

  if (typeof job === 'object') {
    return job;
  }

  const [monkey1, operation, monkey2] = job.split(' ');

  const result = operate(evaluate(monkey1, queue), operation, evaluate(monkey2, queue));

  return result;
}

function solve(a, b, x) {
  return Math.round((b - a) / x); // definitely not ideal
}

const [monkey1, _, monkey2] = jobByMonkey.get('root').split(' ');
const m1Result = evaluate(monkey1);
const m2Result = evaluate(monkey2);
let humn;

if (m1Result.imag) {
  const { real: lhs, imag: x } = m1Result;
  const { real: rhs } = m2Result;
  humn = solve(lhs, rhs, x);
} else {
  const { real: rhs, imag: x } = m1Result;
  const { real: lhs } = m2Result;
  humn = solve(rhs, lhs, x);
}

write(YEAR, DAY, PART, humn);

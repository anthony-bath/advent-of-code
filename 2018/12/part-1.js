import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 12, 1];

const pots = new Map();
const rules = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  if (!line) return;
  if (line.startsWith('initial')) {
    const [, , data] = line.split(' ');
    [...data].forEach((pot, i) => pots.set(i, pot === '#' ? 1 : 0));
  } else {
    const [rule, output] = line.split(' => ');
    rules.set(
      parseInt([...rule].map((pot) => (pot === '#' ? 1 : 0)).join(''), 2),
      output === '#' ? 1 : 0
    );
  }
});

const GENERATIONS = 20;

for (let generation = 1; generation <= GENERATIONS; generation++) {
  const keys = [...pots.keys()];
  const min = Math.min(...keys);
  const max = Math.max(...keys);
  const toUpdate = new Map();

  for (let key = min - 2; key <= max + 2; key++) {
    const value = parseInt(
      [
        pots.get(key - 2) ?? 0,
        pots.get(key - 1) ?? 0,
        pots.get(key) ?? 0,
        pots.get(key + 1) ?? 0,
        pots.get(key + 2) ?? 0,
      ].join(''),
      2
    );

    toUpdate.set(key, rules.get(value));
  }

  for (const [key, newPot] of toUpdate) {
    pots.set(key, newPot);
  }
}

let sum = 0;

for (const [key, pot] of pots) {
  if (pot) {
    sum += key;
  }
}

write(YEAR, DAY, PART, sum);

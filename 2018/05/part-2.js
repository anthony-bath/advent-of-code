import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 5, 2];

const polymer = read(YEAR, DAY, PART, { splitBy: '' }).map((c) => c.charCodeAt(0));

function react(polymer) {
  let index = 1;

  while (index < polymer.length) {
    const l1 = polymer[index];
    const l2 = polymer[index - 1];

    if (Math.abs(l1 - l2) === 32) {
      polymer.splice(index - 1, 2);
      index--;
    } else {
      index++;
    }
  }

  return polymer.length;
}

let min = Infinity;

for (let unit = 65; unit <= 90; unit++) {
  const result = react(polymer.filter((x) => ![unit, unit + 32].includes(x)));

  if (result < min) {
    min = result;
  }
}

write(YEAR, DAY, PART, min);

import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 5, 1];

const polymer = read(YEAR, DAY, PART, { splitBy: '' }).map((c) => c.charCodeAt(0));

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

write(YEAR, DAY, PART, polymer.length);

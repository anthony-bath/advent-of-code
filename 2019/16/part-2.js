import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 16, 1];

const sequence = readOld(YEAR, DAY, PART, { splitBy: '' }).map((n) => Number(n));
const offset = Number(sequence.slice(0, 7).join(''));

const REPEATS = 10000;

let fullSequence = [];

for (let i = 0; i < REPEATS; i++) {
  fullSequence.push(...sequence);
}

fullSequence = fullSequence.slice(offset);

const PHASES = 100;

for (let phase = 0; phase < PHASES; phase++) {
  for (let i = fullSequence.length - 1; i >= 0; i--) {
    fullSequence[i] = Math.abs(((fullSequence[i + 1] || 0) + fullSequence[i]) % 10);
  }
}

write(YEAR, DAY, PART, fullSequence.slice(0, 8).join(''));

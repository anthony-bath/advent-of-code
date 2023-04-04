import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 10, 1];

const input = read(YEAR, DAY, PART, { splitBy: null });
const expr = /(\d)\1{0,}/g;

function lookAndSay(sequence) {
  return sequence
    .match(expr)
    .map((match) => `${match.length}${match[0]}`)
    .join('');
}

let sequence = input;

for (let i = 0; i < 40; i++) {
  sequence = lookAndSay(sequence);
}

write(YEAR, DAY, PART, sequence.length);

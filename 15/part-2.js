import { read, write } from '../utility.js';

const numbers = read(15, { splitBy: ',' }).map((n) => Number(n));
const TURNS = 30000000;

let turn = 1;
const spoken = new Map();
let lastSpoken = null;

while (turn <= TURNS) {
  if (turn <= numbers.length) {
    lastSpoken = numbers[turn - 1];
    spoken.set(lastSpoken, [turn]);
  } else {
    const spokenOnTurns = spoken.get(lastSpoken);

    if (spokenOnTurns.length === 1) {
      lastSpoken = 0;
    } else {
      lastSpoken = spokenOnTurns[1] - spokenOnTurns[0];
    }

    if (spoken.has(lastSpoken)) {
      spoken.set(lastSpoken, [spoken.get(lastSpoken).pop(), turn]);
    } else {
      spoken.set(lastSpoken, [turn]);
    }
  }

  turn++;
}

write(15, 2, lastSpoken);

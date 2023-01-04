import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 15, 2];

const numbers = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));
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

    const lastSpokenTurns = spoken.get(lastSpoken);

    if (lastSpokenTurns) {
      if (lastSpokenTurns.length === 2) {
        lastSpokenTurns.shift();
      }

      lastSpokenTurns.push(turn);
    } else {
      spoken.set(lastSpoken, [turn]);
    }
  }

  turn++;
}

write(YEAR, DAY, PART, lastSpoken);

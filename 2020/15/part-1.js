import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 15, 1];

const numbers = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));
const TURNS = 2020;

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
      const lastTwoTurns = spokenOnTurns.slice(-2);
      lastSpoken = lastTwoTurns[1] - lastTwoTurns[0];
    }

    if (spoken.has(lastSpoken)) {
      spoken.set(lastSpoken, [...spoken.get(lastSpoken), turn]);
    } else {
      spoken.set(lastSpoken, [turn]);
    }
  }

  turn++;
}

write(YEAR, DAY, PART, lastSpoken);

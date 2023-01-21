import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 2, 1];

let twos = 0;
let threes = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const countByLetter = new Map();

  line.split('').forEach((letter) => {
    const count = countByLetter.get(letter) ?? 0;
    countByLetter.set(letter, count + 1);
  });

  let hasTwo = false;
  let hasThree = false;

  for (const [_, count] of countByLetter) {
    if (!hasTwo && count === 2) {
      twos++;
      hasTwo = true;
    }
    if (!hasThree && count === 3) {
      threes++;
      hasThree = true;
    }

    if (hasThree && hasTwo) {
      break;
    }
  }
});

write(YEAR, DAY, PART, twos * threes);

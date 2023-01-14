import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 23, 1];

let cups = read(YEAR, DAY, PART, { splitBy: '' }).map((n) => Number(n));

const MOVES = 100;
let index = 0;

for (let move = 0; move < MOVES; move++) {
  const currentCup = cups[index];
  const pickup = [];

  while (index + 1 <= cups.length - 1 && pickup.length < 3) {
    pickup.push(...cups.splice(index + 1, 1));
  }

  if (pickup.length < 3) {
    pickup.push(...cups.splice(0, 3 - pickup.length));
  }

  let destinationCup = currentCup - 1;

  if (destinationCup < 1) {
    destinationCup = 9;
  }

  while (pickup.includes(destinationCup)) {
    destinationCup--;

    if (destinationCup < 1) {
      destinationCup = 9;
    }
  }

  const destinationIndex = cups.indexOf(destinationCup);

  cups.splice(destinationIndex + 1, 0, ...pickup);

  index = 1 + cups.indexOf(currentCup);
  if (index === cups.length) index = 0;
}

const index1 = cups.indexOf(1);
let result;

if (index1 === 0) {
  result = cups.slice(1);
} else if (index1 === cups.length - 1) {
  result = cups.slice(0, cups.length - 2);
} else {
  result = [...cups.slice(index1 + 1), ...cups.slice(0, index1)];
}

write(YEAR, DAY, PART, result.join(''));

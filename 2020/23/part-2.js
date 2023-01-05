import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 23, 2];

let cups = read(YEAR, DAY, { test: true, splitBy: '' }).map((n) => Number(n));

for (let x = 10; x <= 1000000; x++) {
  cups.push(x);
}

const MOVES = 10000000;
let index = 0;

console.time();
for (let move = 0; move < MOVES; move++) {
  if (move % 1000 === 0) {
    console.log(move);
    console.timeLog();
  }
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
console.log(cups[index1 + 1], cups[index1 + 2]);

write(YEAR, DAY, PART, result.join(''));

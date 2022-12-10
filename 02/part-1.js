import { read, write } from '../utility.js';

// Rock (1) = A, X
// Paper (2) = B, Y
// Scissors (3) = C, Z

const scoreByPlays = new Map([
  ['A X', 1 + 3],
  ['A Y', 2 + 6],
  ['A Z', 3 + 0],
  ['B X', 1 + 0],
  ['B Y', 2 + 3],
  ['B Z', 3 + 6],
  ['C X', 1 + 6],
  ['C Y', 2 + 0],
  ['C Z', 3 + 3],
]);

const strategyScore = read(2).reduce((score, plays) => (score += scoreByPlays.get(plays)), 0);

write(2, 1, `${strategyScore}`);

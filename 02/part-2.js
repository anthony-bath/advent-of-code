import fs from 'fs';

// X(0)= Lose
// Y(3) = Draw
// Z(6) = Win

// Rock(1) = A
// Paper(2) = B
// Scissors(3) = C

const scoreByPlays = new Map([
  ['A X', 0 + 3],
  ['A Y', 3 + 1],
  ['A Z', 6 + 2],
  ['B X', 0 + 1],
  ['B Y', 3 + 2],
  ['B Z', 6 + 3],
  ['C X', 0 + 2],
  ['C Y', 3 + 3],
  ['C Z', 6 + 1],
]);

const strategyScore = fs
  .readFileSync('./02/input.txt', 'utf-8')
  .split('\n')
  .reduce((score, plays) => (score += scoreByPlays.get(plays)), 0);

fs.writeFileSync('./02/output-2.txt', `${strategyScore}`);

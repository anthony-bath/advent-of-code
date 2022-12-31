import { write } from '../../utility.js';
import { loadData } from './common.js';

const [YEAR, DAY, PART] = [2021, 21, 1];

const { p1Start, p2Start } = loadData();

function sumMtoN(m, n) {
  return (n * (n + 1)) / 2 - (m * (m - 1)) / 2;
}

function getPosition(current, rolls) {
  const moves = sumMtoN(rolls - 2, rolls) % 10;
  return ((current + moves - 1) % 10) + 1;
}

let rolls = 0;
let p1Score = 0;
let p2Score = 0;
let p1Position = p1Start;
let p2Position = p2Start;
let loserScore;

while (true) {
  rolls += 3;
  p1Position = getPosition(p1Position, rolls);
  p1Score += p1Position;

  if (p1Score >= 1000) {
    loserScore = p2Score;
    break;
  }

  rolls += 3;
  p2Position = getPosition(p2Position, rolls);
  p2Score += p2Position;

  if (p2Score >= 1000) {
    loserScore = p1Score;
    break;
  }
}

write(YEAR, DAY, PART, loserScore * rolls);

import { sumMtoN } from '../../utilities/math.js';
import { getInputElements } from './common.js';

export function part1({ lines }) {
  const { p1Start, p2Start } = getInputElements(lines);

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

  return loserScore * rolls;
}

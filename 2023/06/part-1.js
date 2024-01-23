import { solveQuadratic } from '../../utilities/math.js';

export function part1({ lines }) {
  const times = lines[0].match(/\d+/g).map((n) => Number(n));
  const distances = lines[1].match(/\d+/g).map((n) => Number(n));

  return times.reduce((result, time, i) => {
    const [t1, t2] = solveQuadratic(1, -time, distances[i]);
    const chances = Math.floor(t1) - Math.ceil(t2) + 1;

    return (result *= chances);
  }, 1);
}

import { solveQuadratic } from '../../utilities/math.js';

export function part2({ lines }) {
  const time = Number(lines[0].match(/\d+/g).join(''));
  const distance = Number(lines[1].match(/\d+/g).join(''));
  const [t1, t2] = solveQuadratic(1, -time, distance);

  return Math.floor(t1) - Math.ceil(t2) + 1;
}

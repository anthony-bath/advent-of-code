import { Knot } from './common.js';

export function part2({ lines }) {
  const directions = lines
    .map((line) => {
      const [direction, distance] = line.split(' ');
      return direction.repeat(parseInt(distance)).split('');
    })
    .flat();

  const KNOT_COUNT = 10;
  const knots = [];

  for (let i = 0; i < KNOT_COUNT; i++) {
    knots.push(new Knot(0, 0, i > 0 ? knots[i - 1] : null));
  }

  const head = knots.pop();
  const tail = knots.shift();

  directions.forEach((direction) => head.pull(direction));

  return tail.positions.size;
}

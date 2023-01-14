import { read, write } from '../../utilities/io.js';
import { Knot } from './common.js';

const [YEAR, DAY, PART] = [2022, 9, 2];

const directions = read(YEAR, DAY, PART)
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

write(YEAR, DAY, PART, tail.positions.size);

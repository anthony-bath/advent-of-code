import { write } from '../utility.js';
import { directions, Knot } from './common.js';

const KNOT_COUNT = 10;
const knots = [];

for (let i = 0; i < KNOT_COUNT; i++) {
  knots.push(new Knot(0, 0, i > 0 ? knots[i - 1] : null));
}

const head = knots.pop();
const tail = knots.shift();

directions.forEach((direction) => head.pull(direction));

write(9, 2, `${tail.positions.size}`);

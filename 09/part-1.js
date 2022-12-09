import fs from 'fs';
import { directions, Knot } from './common.js';

const KNOT_COUNT = 2;
const knots = [];

for (let i = 0; i < KNOT_COUNT; i++) {
  knots.push(new Knot(0, 0, i > 0 ? knots[i - 1] : null));
}

const head = knots.pop();
const tail = knots.shift();

directions.forEach((direction) => head.pull(direction));

fs.writeFileSync('./09/output-1.txt', `${tail.positions.size}`);

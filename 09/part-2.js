import fs from 'fs';
import { movements, Point } from './common.js';

const KNOT_COUNT = 10;
const knots = [];

for (let i = 0; i < KNOT_COUNT; i++) {
  knots.push(new Point(0, 0, i > 0 ? knots[i - 1] : null));
}

const head = knots.pop();
const tail = knots.shift();

movements.forEach((movement) => head.applyMovement(movement));

fs.writeFileSync('./09/output-2.txt', `${tail.positions.size}`);

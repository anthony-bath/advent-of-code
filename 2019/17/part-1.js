import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 17, 1];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const state = { pointer: 0, program: [...program], relativeBase: 0 };

const output = [];
let row = [];

while (!state.halted) {
  const result = execute(state);

  if (result === 10) {
    output.push(row);
    row = [];
  } else {
    row.push(String.fromCharCode(result));
  }
}

const intersections = [];

const deltas = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, 1],
];

for (let y = 1; y < output.length - 1; y++) {
  for (let x = 1; x < output[0].length - 1; x++) {
    if (deltas.every(([dx, dy]) => output[y + dy][x + dx] === '#')) {
      intersections.push([x, y]);
    }
  }
}

const result = intersections.reduce((sum, [ix, iy]) => sum + ix * iy, 0);

write(YEAR, DAY, PART, result);

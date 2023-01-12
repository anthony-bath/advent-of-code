import { read, write } from '../../utility.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 11, 2];

const program = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

const DIR = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
};

const white = new Set();
const black = new Set();
let painted = new Set();

white.add(`0|0`);
const robot = { x: 0, y: 0, dir: DIR.UP, square: 'w' };

const state = { pointer: 0, program, relativeBase: 0 };
const output = [];

while (!state.halted) {
  output.push(execute(state, [robot.square === 'b' ? 0 : 1]));

  if (output.length === 2) {
    const color = output.shift();
    const turn = output.shift();

    const beforePosKey = `${robot.x}|${robot.y}`;

    if (color === 0) {
      // paint black
      painted.add(beforePosKey);
      black.add(beforePosKey);
      white.delete(beforePosKey);
    } else {
      // paint white
      painted.add(beforePosKey);
      black.delete(beforePosKey);
      white.add(beforePosKey);
    }

    if (turn === 0) {
      robot.dir--;

      if (robot.dir === 0) {
        robot.dir = DIR.LEFT;
      }
    } else {
      // turn right 90 deg
      robot.dir++;

      if (robot.dir === 5) {
        robot.dir = DIR.UP;
      }
    }

    // advance robot
    switch (robot.dir) {
      case DIR.UP:
        robot.y += 1;
        break;

      case DIR.DOWN:
        robot.y -= 1;
        break;

      case DIR.RIGHT:
        robot.x += 1;
        break;

      case DIR.LEFT:
        robot.x -= 1;
        break;
    }

    const afterPosKey = `${robot.x}|${robot.y}`;

    if (!white.has(afterPosKey)) {
      black.add(afterPosKey);
    }

    robot.square = white.has(`${robot.x}|${robot.y}`) ? 'w' : 'b';
  }
}

const result = [];

for (let x = 0; x <= 42; x++) {
  const row = [];

  for (let y = -5; y <= 0; y++) {
    if (white.has(`${x}|${y}`)) {
      row.push('⬜');
    } else {
      row.push('⬛');
    }
  }

  result.push(row);
}

write(YEAR, DAY, PART, result.map((row) => row.join('')).join('\n'));

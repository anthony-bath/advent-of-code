import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 11, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const DIR = {
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
};

const white = new Set();
const black = new Set();
let painted = new Set();
const robot = { x: 0, y: 0, dir: DIR.UP, square: 'b' };

const state = { pointer: 0, program };
const output = [];

while (!state.halted) {
  output.push(execute(state, [robot.square === 'b' ? 0 : 1]));

  if (output.length === 2) {
    const color = output.shift();
    const turn = output.shift();

    const key = `${robot.x}|${robot.y}`;

    if (color === 0) {
      // paint black
      painted.add(key);
      black.add(key);
      white.delete(key);
    } else {
      // paint white
      painted.add(key);
      black.delete(key);
      white.add(key);
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

    robot.square = white.has(`${robot.x}|${robot.y}`) ? 'w' : 'b';
  }
}

write(YEAR, DAY, PART, painted.size);

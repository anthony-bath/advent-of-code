import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 12, 1];

const X_START = 0;
const Y_START = 0;
const expr = /(?<instruction>[NSEWFLR])(?<amount>\d+)/;

let facing = 90;
let x = X_START;
let y = Y_START;

readOld(YEAR, DAY, PART).forEach((line) => {
  let { instruction, amount } = line.match(expr).groups;
  amount = Number(amount);

  switch (instruction) {
    case 'N':
      y -= amount;
      break;

    case 'S':
      y += amount;
      break;

    case 'E':
      x += amount;
      break;

    case 'W':
      x -= amount;
      break;

    case 'R':
      facing = (facing + amount) % 360;
      break;

    case 'L':
      facing = (facing + (360 - amount)) % 360;
      break;

    case 'F':
      switch (facing) {
        case 0:
          y -= amount;
          break;

        case 90:
          x += amount;
          break;

        case 180:
          y += amount;
          break;

        case 270:
          x -= amount;
          break;
      }
  }
});

write(YEAR, DAY, PART, Math.abs(x) + Math.abs(y));

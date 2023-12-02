import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 2, 1];

const MAXES = {
  red: 12,
  green: 13,
  blue: 14,
};

const expr = /(?<count>\d+)\s(?<color>\w+)/g;

const total = read(YEAR, DAY, PART).reduce((total, game) => {
  const id = Number(game.match(/\d+/g)[0]);
  let possible = true;
  let match;

  while ((match = expr.exec(game)?.groups)) {
    const color = match.color;

    if (Number(match.count) > MAXES[color]) {
      possible = false;
      expr.lastIndex = 0;
      break;
    }
  }

  return total + (possible ? id : 0);
}, 0);

write(YEAR, DAY, PART, total);

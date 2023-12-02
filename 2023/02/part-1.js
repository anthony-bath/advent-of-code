import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 2, 1];

const MAXES = {
  red: 12,
  green: 13,
  blue: 14,
};

const cubeExpr = /(?<count>\d+)\s(?<color>\w+)/;
let total = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const [gameLabel, game] = line.split(': ');
  const id = Number(gameLabel.match(/\d+/g)[0]);

  const reveals = game.split(';');
  let possible = true;

  for (const reveal of reveals) {
    const cubes = reveal.split(', ');

    for (const cube of cubes) {
      const { count, color } = cube.match(cubeExpr).groups;

      if (Number(count) > MAXES[color]) {
        possible = false;
        break;
      }
    }

    if (!possible) break;
  }

  total += possible ? id : 0;
});

write(YEAR, DAY, PART, total);

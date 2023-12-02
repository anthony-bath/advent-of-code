import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 2, 2];

const cubeExpr = /(?<count>\d+)\s(?<color>\w+)/;
let total = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const [_, game] = line.split(': ');
  const reveals = game.split(';');
  const counts = { red: 0, green: 0, blue: 0 };

  for (const reveal of reveals) {
    const cubes = reveal.split(', ');

    for (const cube of cubes) {
      const match = cube.match(cubeExpr).groups;
      const count = Number(match.count);
      const color = match.color;

      if (!counts[color] || count > counts[color]) {
        counts[color] = count;
      }
    }
  }

  total += Object.values(counts).reduce((product, count) => (product *= count), 1);
});

write(YEAR, DAY, PART, total);

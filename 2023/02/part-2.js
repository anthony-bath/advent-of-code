import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 2, 2];

const expr = /(?<count>\d+)\s(?<color>\w+)/g;

const total = read(YEAR, DAY, PART).reduce((total, game) => {
  const counts = { red: 0, green: 0, blue: 0 };
  let match;

  while ((match = expr.exec(game)?.groups)) {
    counts[match.color] = Math.max(Number(match.count), counts[match.color]);
  }

  return total + counts.red * counts.blue * counts.green;
}, 0);

write(YEAR, DAY, PART, total);

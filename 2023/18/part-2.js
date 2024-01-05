import { readOld, write } from '../../utilities/io.js';
import { shoelace } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2023, 18, 2];

const expr = /\(#(?<dist>[a-f0-9]{5})(?<dir>\d)\)/;
let totalSteps = 0;
let points = [[0, 0]];

readOld(YEAR, DAY, PART).forEach((line) => {
  const { dist, dir } = line.match(expr).groups;
  const distance = parseInt(dist, 16);
  const [x, y] = points[points.length - 1];

  switch (dir) {
    case '0':
      // Right
      points.push([x + distance, y]);
      break;

    case '1':
      // Down
      points.push([x, y + distance]);
      break;

    case '2':
      // Left
      points.push([x - distance, y]);
      break;

    case '3':
      // Up
      points.push([x, y - distance]);
      break;
  }

  totalSteps += distance;
});

write(YEAR, DAY, PART, 1 + totalSteps / 2 + shoelace(points));

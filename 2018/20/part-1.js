import { read, write } from '../../utilities/io.js';
import { getData } from './common.js';

const [YEAR, DAY, PART] = [2018, 20, 1];

const input = read(YEAR, DAY, PART, { splitBy: null }).replace(/[\^\$]/g, '');
const { map, xMin, xMax, yMin, yMax } = getData(input);

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const queue = [{ x: 0, y: 0, doors: 0 }];
const visited = new Set();
let maxDoors = -Infinity;

while (queue.length) {
  const curr = queue.shift();
  visited.add(`${curr.x}|${curr.y}`);
  maxDoors = Math.max(maxDoors, curr.doors);

  for (const [dx, dy] of deltas) {
    let nextX = curr.x + dx;
    let nextY = curr.y + dy;

    if (nextX < xMin || nextX > xMax || nextY < yMin || nextY > yMax) continue;

    // Check for doors before taking an extra step into the room
    if (map.has(`${nextX}|${nextY}`)) {
      nextX = nextX + dx;
      nextY = nextY + dy;

      if (!visited.has(`${nextX}|${nextY}`)) {
        queue.push({
          x: nextX,
          y: nextY,
          doors: curr.doors + 1,
        });
      }
    }
  }
}

write(YEAR, DAY, PART, maxDoors);

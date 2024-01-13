import { getInputElements, deltas } from './common.js';

export function part2({ data }) {
  const { map, xMin, xMax, yMin, yMax } = getInputElements(data);

  const queue = [{ x: 0, y: 0, doors: 0 }];
  const visited = new Set();
  let count = 0;

  while (queue.length) {
    const curr = queue.shift();
    visited.add(`${curr.x}|${curr.y}`);

    if (curr.doors >= 1000) {
      count++;
    }

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

  return count;
}

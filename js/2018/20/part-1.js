import { getInputElements, deltas } from './common.js';

export function part1({ data }) {
  const { map, xMin, xMax, yMin, yMax } = getInputElements(data);

  const stack = [{ x: 0, y: 0, doors: 0 }];
  const visited = new Set();
  let maxDoors = -Infinity;

  while (stack.length) {
    const curr = stack.pop();
    visited.add(`${curr.x}|${curr.y}`);

    if (curr.doors > maxDoors) {
      maxDoors = curr.doors;
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
          stack.push({
            x: nextX,
            y: nextY,
            doors: curr.doors + 1,
          });
        }
      }
    }
  }

  return maxDoors;
}

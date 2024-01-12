import { sum } from '../../utilities/array.js';

export function part2({ data }) {
  const gridSerialNumber = Number(data);

  const SIZE = 300;
  const grid = [];
  const cache = {};

  for (let y = 1; y <= SIZE; y++) {
    const row = [];

    for (let x = 1; x <= SIZE; x++) {
      const rackId = x + 10;
      let powerLevel = rackId * y;

      powerLevel += gridSerialNumber;
      powerLevel *= rackId;
      powerLevel = Math.floor((powerLevel / 100) % 10);
      powerLevel -= 5;

      row.push(powerLevel);
      cache[`${x - 1}|${y - 1}`] = powerLevel;
    }

    grid.push(row);
  }

  let result = { totalPower: -Infinity };

  for (let size = 2; size <= SIZE; size++) {
    for (let y = 0; y <= SIZE - size; y++) {
      for (let x = 0; x <= SIZE - size; x++) {
        let totalPower = cache[`${x}|${y}`];

        // bottom row of new square
        totalPower += sum(grid[y + size - 1].slice(x, x + size));

        // right column of new square
        for (let yOffset = 0; yOffset < size - 1; yOffset++) {
          totalPower += grid[y + yOffset][x + size - 1];
        }

        if (totalPower > result.totalPower) {
          result = { totalPower, x: x + 1, y: y + 1, size };
        }

        cache[`${x}|${y}`] = totalPower;
      }
    }
  }

  return `${result.x},${result.y},${result.size}`;
}

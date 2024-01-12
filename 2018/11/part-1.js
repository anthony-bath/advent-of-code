import { sum } from '../../utilities/array.js';

export function part1({ data }) {
  const gridSerialNumber = Number(data);

  const SIZE = 300;
  const grid = [];

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
    }

    grid.push(row);
  }

  let result = { totalPower: -Infinity };

  for (let y = 0; y < SIZE - 3; y++) {
    for (let x = 0; x < SIZE - 3; x++) {
      const totalPower =
        sum(grid[y].slice(x, x + 3)) +
        sum(grid[y + 1].slice(x, x + 3)) +
        sum(grid[y + 2].slice(x, x + 3));

      if (totalPower > result.totalPower) {
        result = { totalPower, x: x + 1, y: y + 1 };
      }
    }
  }

  return `${result.x},${result.y}`;
}

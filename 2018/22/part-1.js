import { sum } from '../../utilities/array.js';

export function part1({ lines }) {
  const [depth, [tx, ty]] = lines.map((line) => {
    if (line.startsWith('depth')) {
      return Number(line.match(/\d+/));
    } else {
      return line.match(/\d+/g).map(Number);
    }
  });

  const erosionLevels = Array(ty + 1)
    .fill()
    .map(() => Array(tx + 1).fill(0));

  const regionTypes = Array(ty + 1)
    .fill()
    .map(() => Array(tx + 1).fill(0));

  for (let y = 0; y < erosionLevels.length; y++) {
    for (let x = 0; x < erosionLevels[0].length; x++) {
      let geologicIndex;

      if (x === 0 && y === 0) {
        geologicIndex = 0;
      } else if (x === tx && y === ty) {
        geologicIndex = 0;
      } else if (y === 0) {
        geologicIndex = x * 16807;
      } else if (x === 0) {
        geologicIndex = y * 48271;
      } else {
        geologicIndex = erosionLevels[y - 1][x] * erosionLevels[y][x - 1];
      }

      erosionLevels[y][x] = (geologicIndex + depth) % 20183;
      regionTypes[y][x] = erosionLevels[y][x] % 3;
    }
  }

  return regionTypes.reduce((total, row) => total + sum(row), 0);
}

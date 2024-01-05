import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 6, 1];

const grid = Array(1000)
  .fill()
  .map(() => Array(1000).fill(false));

readOld(YEAR, DAY, PART).forEach((line) => {
  const [x1, y1, x2, y2] = line.match(/\d+/g).map((n) => Number(n));

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (line.startsWith('turn on')) {
        grid[y][x] = true;
      } else if (line.startsWith('turn off')) {
        grid[y][x] = false;
      } else {
        grid[y][x] = !grid[y][x];
      }
    }
  }
});

let count = 0;

for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    if (grid[y][x]) count++;
  }
}

write(YEAR, DAY, PART, count);

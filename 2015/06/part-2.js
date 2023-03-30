import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 6, 2];

const grid = Array(1000)
  .fill()
  .map(() => Array(1000).fill(0));

read(YEAR, DAY, PART).forEach((line) => {
  const [x1, y1, x2, y2] = line.match(/\d+/g).map((n) => Number(n));

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (line.startsWith('turn on')) {
        grid[y][x]++;
      } else if (line.startsWith('turn off')) {
        grid[y][x] = Math.max(0, grid[y][x] - 1);
      } else {
        grid[y][x] += 2;
      }
    }
  }
});

let brightness = 0;

for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    brightness += grid[y][x];
  }
}

write(YEAR, DAY, PART, brightness);

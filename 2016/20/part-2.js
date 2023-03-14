import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 20, 2];

const ranges = read(YEAR, DAY, PART).map((line) => {
  const [start, end] = line.split('-').map((n) => Number(n));
  return { start, end };
});

ranges.sort((a, b) => a.start - b.start);

const MAX = 4294967295;

let allowedCount = 0;
let currentMax = 0;

for (const range of ranges) {
  allowedCount += Math.max(0, range.start - currentMax - 1);
  currentMax = Math.max(currentMax, range.end);
}

allowedCount += Math.max(0, MAX - currentMax);

write(YEAR, DAY, PART, allowedCount);

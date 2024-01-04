import { read2 } from './io.js';

export function runDay(year, day, part1, part2) {
  const data = read2(year, day);

  if (part1) {
    timeAndRun(() => part1(data), 1);
  }

  if (part2) {
    timeAndRun(() => part2(data), 2);
  }
}

function timeAndRun(part, number) {
  const start = process.hrtime();
  const result = part();
  const end = process.hrtime(start);

  console.log(`Part ${number}: ${result} (${end[0]}s ${end[1] / 1000000}ms)`);
}

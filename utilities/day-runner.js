import { loadInput } from './io.js';
import { hrtime } from 'node:process';

const year = process.argv[2];
const day = process.argv[3];
const test = process.env.npm_config_t;

if (!year || !day) {
  console.log('Usage: node day-runner.js <year> <day> [-t]');
  process.exit(1);
}

const dayPadded = day.padStart(2, '0');

const { part1 } = await import(`../${year}/${dayPadded}/part-1.js`);
let part2;

try {
  part2 = (await import(`../${year}/${dayPadded}/part-2.js`))?.part2;
} catch (e) {
  // No part 2
}

const { lines, data } = loadInput(year, day, { test });

for (const [i, part] of [part1, part2].entries()) {
  if (!part) continue;

  const grid = lines.map((line) => line.split(''));
  const start = hrtime.bigint();
  const result = part({ lines, grid, data });
  const diff = hrtime.bigint() - start;

  console.log(`Part ${i + 1} (${Number(diff) / 1e6}ms)`);
  console.log(result);
}

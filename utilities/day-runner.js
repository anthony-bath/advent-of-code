import { read } from './io.js';

const year = process.argv[2];
const day = process.argv[3];
const test = process.env.npm_config_t;

if (!year || !day) {
  console.log('Usage: node day-runner.js <year> <day> -t?');
  process.exit(1);
}

const data = read(year, day, { test });
const dayPadded = day.padStart(2, '0');

const { part1 } = await import(`../${year}/${dayPadded}/part-1.js`);
const { part2 } = await import(`../${year}/${dayPadded}/part-2.js`);

timeAndRun(() => part1(data), 1);
timeAndRun(() => part2(data), 2);

function timeAndRun(part, number) {
  const start = process.hrtime();
  const result = part();
  const end = process.hrtime(start);

  console.log(`Part ${number} (${end[0]}s ${end[1] / 1000000}ms)`);
  console.log(result);
}

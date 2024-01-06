import fs from 'fs';
import path from 'path';

const year = process.argv[2];
const day = process.argv[3];

if (!year || !day) {
  console.log('Usage: node day-creator.js <year> <day>');
  process.exit(1);
}

const yearDir = path.join(process.cwd(), year);

if (!fs.existsSync(yearDir)) {
  fs.mkdirSync(yearDir);
}

const dayPadded = day.padStart(2, '0');
const dayDir = path.join(yearDir, dayPadded);

if (!fs.existsSync(dayDir)) {
  fs.mkdirSync(dayDir);
}

const part1Js = path.join(dayDir, 'part-1.js');

if (!fs.existsSync(part1Js)) {
  fs.writeFileSync(
    part1Js,
    `export function part1({ lines, data }) {
  return 0;
}`
  );
}

const part2Js = path.join(dayDir, 'part-2.js');

if (!fs.existsSync(part2Js)) {
  fs.writeFileSync(
    part2Js,
    `export function part2({ lines, data }) {
  return 0;
}`
  );
}

const inputTxt = path.join(dayDir, 'input.txt');

if (!fs.existsSync(inputTxt)) {
  fs.writeFileSync(inputTxt, '');
}

const testsDir = path.join(yearDir, 'tests');

if (!fs.existsSync(testsDir)) {
  fs.mkdirSync(testsDir);
}

const testJs = path.join(testsDir, `${year}.${dayPadded}.test.js`);

if (!fs.existsSync(testJs)) {
  fs.writeFileSync(
    testJs,
    `import { loadInput } from '../../utilities/io.js';
import { part1 } from '../${dayPadded}/part-1.js';
import { part2 } from '../${dayPadded}/part-2.js';

const { lines, data } = loadInput(${year}, ${day});
let grid;

describe('${year} Day ${day}', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(0);
  });

  it('Part 2', () => {
    expect(part2({ lines, grid, data })).toBe(0);
  });
});`
  );
}

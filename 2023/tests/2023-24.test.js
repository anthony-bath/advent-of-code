import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

const { lines, data } = loadInput(2023, 24);
let grid;

describe('2023 Day 24', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(17906);
  });

  test('Part 2', async () => {
    expect(await part2({ lines, grid, data })).toBe(571093786416929);
  });
});

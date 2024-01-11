import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { lines, data } = loadInput(2017, 18);
let grid;

describe('2017 Day 18', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(7071);
  });

  it('Part 2', () => {
    expect(part2({ lines, grid, data })).toBe(8001);
  });
});

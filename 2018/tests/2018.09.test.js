import { loadInput } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const { lines, data } = loadInput(2018, 9);
let grid;

describe('2018 Day 9', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(384205);
  });

  test('Part 2', () => {
    expect(part2({ lines, grid, data })).toBe(3066307353);
  });
});

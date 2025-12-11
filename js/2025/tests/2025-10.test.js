import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines, data } = loadInput(2025, 10);
let grid;

describe('2025 Day 10', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(491);
  });

  test('Part 2', () => {
    expect(part2({ lines, grid, data })).toBe(20617);
  });
});

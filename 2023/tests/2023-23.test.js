import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { lines } = loadInput(2023, 23);
let grid;

describe('2023 Day 23', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ grid })).toBe(2326);
  });

  test('Part 2', () => {
    expect(part2({ grid })).toBe(6574);
  });
});

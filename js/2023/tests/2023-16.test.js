import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { lines } = loadInput(2023, 16);
let grid;

describe('2023 Day 16', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ grid })).toBe(7979);
  });

  test('Part 2', () => {
    expect(part2({ grid })).toBe(8437);
  });
});

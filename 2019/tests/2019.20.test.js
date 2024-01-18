import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { lines } = loadInput(2019, 20);
let grid;

describe('2019 Day 20', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ grid })).toBe(454);
  });

  test('Part 2', () => {
    expect(part2({ grid })).toBe(5744);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

const { lines } = loadInput(2019, 24);
let grid;

describe('2019 Day 24', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ grid })).toBe(28781019);
  });

  test('Part 2', () => {
    expect(part2({ grid })).toBe(1939);
  });
});

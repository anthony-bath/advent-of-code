import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

const { lines } = loadInput(2022, 24);
let grid;

describe('2022 Day 24', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ grid })).toBe(225);
  });

  test('Part 2', () => {
    expect(part2({ grid })).toBe(711);
  });
});

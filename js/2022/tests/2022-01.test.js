import { loadInput } from '../../utilities/io.js';
import { part1 } from '../01/part-1.js';
import { part2 } from '../01/part-2.js';

const { lines } = loadInput(2022, 1);

describe('2022 Day 1', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(64929);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(193697);
  });
});

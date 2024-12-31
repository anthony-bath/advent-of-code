import { loadInput } from '../../utilities/io.js';
import { part1 } from '../01/part-1.js';
import { part2 } from '../01/part-2.js';

const { lines } = loadInput(2023, 1);

describe('2023 Day 1', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(56465);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(55902);
  });
});

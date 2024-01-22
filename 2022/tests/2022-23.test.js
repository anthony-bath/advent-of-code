import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { lines } = loadInput(2022, 23);

describe('2022 Day 23', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(4208);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1016);
  });
});

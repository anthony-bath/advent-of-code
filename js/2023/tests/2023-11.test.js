import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { lines } = loadInput(2023, 11);

describe('2023 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(9742154);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(411142919886);
  });
});

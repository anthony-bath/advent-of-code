import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { lines } = loadInput(2019, 3);

describe('2019 Day 3', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(1674);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(14012);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { lines } = loadInput(2023, 4);

describe('2023 Day 4', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(22674);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(5747443);
  });
});

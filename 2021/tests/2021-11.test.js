import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { lines } = loadInput(2021, 11);

describe('2021 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(1665);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(235);
  });
});

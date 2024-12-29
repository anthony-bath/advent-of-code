import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { lines } = loadInput(2021, 20);

describe('2021 Day 20', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(5316);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(16728);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../02/part-1.js';
import { part2 } from '../02/part-2.js';

const { lines } = loadInput(2021, 2);

describe('2021 Day 2', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(1692075);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1749524700);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../21/part-1.js';
import { part2 } from '../21/part-2.js';

const { lines } = loadInput(2017, 21);

describe('2017 Day 21', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(142);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1879071);
  });
});

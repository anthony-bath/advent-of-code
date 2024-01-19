import { loadInput } from '../../utilities/io.js';
import { part1 } from '../19/part-1.js';
import { part2 } from '../19/part-2.js';

const { lines } = loadInput(2015, 19);

describe('2015 Day 19', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(509);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(195);
  });
});

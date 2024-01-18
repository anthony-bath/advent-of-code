import { loadInput } from '../../utilities/io.js';
import { part1 } from '../12/part-1.js';
import { part2 } from '../12/part-2.js';

const { lines } = loadInput(2017, 12);

describe('2017 Day 12', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(175);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(213);
  });
});

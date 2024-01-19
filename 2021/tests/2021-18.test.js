import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { lines } = loadInput(2021, 18);

describe('2021 Day 18', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(3647);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(4600);
  });
});

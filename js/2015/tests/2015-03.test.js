import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { data } = loadInput(2015, 3);

describe('2015 Day 3', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(2565);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(2639);
  });
});

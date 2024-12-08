import { loadInput } from '../../utilities/io.js';
import { part1 } from '../01/part-1.js';
import { part2 } from '../01/part-2.js';

const { data } = loadInput(2015, 1);

describe('2015 Day 1', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(232);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(1783);
  });
});

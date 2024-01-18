import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { data } = loadInput(2017, 11);

describe('2017 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(747);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(1544);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const { data } = loadInput(2016, 13);

describe('2016 Day 13', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(92);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(124);
  });
});

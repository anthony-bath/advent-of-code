import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { data } = loadInput(2016, 18);

describe('2016 Day 18', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(2016);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(19998750);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../14/part-1.js';
import { part2 } from '../14/part-2.js';

const { data } = loadInput(2017, 14);

describe('2017 Day 14', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(8304);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(1018);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const { data } = loadInput(2017, 9);

describe('2017 Day 9', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(9662);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(4903);
  });
});

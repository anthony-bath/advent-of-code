import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { data } = loadInput(2015, 11);

describe('2015 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe('vzbxxyzz');
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe('vzcaabcc');
  });
});

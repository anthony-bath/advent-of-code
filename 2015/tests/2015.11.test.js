import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { data } = loadInput(2015, 11);

describe('2015 Day 11', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe('vzbxxyzz');
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe('vzcaabcc');
  });
});

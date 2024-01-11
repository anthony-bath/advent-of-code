import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { data } = loadInput(2017, 10);

describe('2017 Day 10', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(11413);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe('7adfd64c2a03a4968cf708d1b7fd418d');
  });
});

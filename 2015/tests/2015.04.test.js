import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { data } = loadInput(2015, 4);

describe('2015 Day 4', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(346386);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(9958218);
  });
});

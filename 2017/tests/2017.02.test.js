import { loadInput } from '../../utilities/io.js';
import { part1 } from '../02/part-1.js';
import { part2 } from '../02/part-2.js';

const { lines } = loadInput(2017, 2);

describe('2017 Day 2', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(21845);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(191);
  });
});

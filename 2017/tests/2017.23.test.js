import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { lines } = loadInput(2017, 23);

describe('2017 Day 23', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(9409);
  });

  it('Part 2', () => {
    expect(part2()).toBe(913);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

const { lines } = loadInput(2016, 24);

describe('2016 Day 24', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(442);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(660);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { lines } = loadInput(2017, 5);

describe('2017 Day 5', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(359348);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(27688760);
  });
});

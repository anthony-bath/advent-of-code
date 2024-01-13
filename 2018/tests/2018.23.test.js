import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { lines } = loadInput(2018, 23);

describe('2018 Day 23', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(396);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(119406340);
  });
});

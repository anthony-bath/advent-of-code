import { loadInput } from '../../utilities/io.js';
import { part1 } from '../08/part-1.js';
import { part2 } from '../08/part-2.js';

const { lines } = loadInput(2017, 8);

describe('2017 Day 8', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(4832);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(5443);
  });
});

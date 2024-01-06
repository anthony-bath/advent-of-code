import { loadInput } from '../../utilities/io.js';
import { part1 } from '../07/part-1.js';
import { part2 } from '../07/part-2.js';

const { lines } = loadInput(2015, 7);

describe('2015 Day 7', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(46065);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(14134);
  });
});

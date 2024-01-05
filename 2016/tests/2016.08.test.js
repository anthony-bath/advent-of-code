import { read } from '../../utilities/io.js';
import { part1 } from '../08/part-1.js';
import { part2 } from '../08/part-2.js';

const data = read(2016, 8);

describe('2016 Day 8', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(116);
  });

  // Part 2 outputs a grid of pixels, so we'll just check that it's not empty.
  it('Part 2', () => {
    expect(part2(data).length).toBeGreaterThan(0);
  });
});

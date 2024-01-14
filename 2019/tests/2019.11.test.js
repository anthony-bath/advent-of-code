import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { data } = loadInput(2019, 11);

describe('2019 Day 11', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(2539);
  });

  // Part 2 outputs a grid of pixels, so we'll just check that it's not empty.
  it('Part 2', () => {
    expect(part2({ data }).length).toBeGreaterThan(0);
  });
});

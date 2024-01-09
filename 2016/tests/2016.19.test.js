import { loadInput } from '../../utilities/io.js';
import { part1 } from '../19/part-1.js';
import { part2 } from '../19/part-2.js';

const { data } = loadInput(2016, 19);

describe('2016 Day 19', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(1815603);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(1410630);
  });
});

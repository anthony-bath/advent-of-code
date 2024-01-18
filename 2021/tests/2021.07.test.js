import { loadInput } from '../../utilities/io.js';
import { part1 } from '../07/part-1.js';
import { part2 } from '../07/part-2.js';

const { data } = loadInput(2021, 7);

describe('2021 Day 7', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(355150);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(98368490);
  });
});

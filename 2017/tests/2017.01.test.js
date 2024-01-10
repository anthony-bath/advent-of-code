import { loadInput } from '../../utilities/io.js';
import { part1 } from '../01/part-1.js';
import { part2 } from '../01/part-2.js';

const { data } = loadInput(2017, 1);

describe('2017 Day 1', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(1251);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(1244);
  });
});

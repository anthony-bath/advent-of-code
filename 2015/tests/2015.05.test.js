import { read } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const data = read(2015, 5);

describe('2015 Day 5', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(238);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(69);
  });
});

import { read } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const data = read(2015, 16);

describe('2015 Day 16', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(213);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(323);
  });
});

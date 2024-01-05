import { read } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const data = read(2015, 15);

describe('2015 Day 15', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(21367368);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(1766400);
  });
});

import { read } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const data = read(2015, 13);

describe('2015 Day 13', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(733);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(725);
  });
});

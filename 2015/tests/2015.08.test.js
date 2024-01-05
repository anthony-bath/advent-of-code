import { read } from '../../utilities/io.js';
import { part1 } from '../08/part-1.js';
import { part2 } from '../08/part-2.js';

const data = read(2015, 8);

describe('2015 Day 8', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(1350);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(2085);
  });
});

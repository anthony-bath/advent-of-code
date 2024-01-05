import { read } from '../../utilities/io.js';
import { part1 } from '../14/part-1.js';
import { part2 } from '../14/part-2.js';

const data = read(2015, 14);

describe('2015 Day 14', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(2655);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(1059);
  });
});

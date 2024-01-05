import { read } from '../../utilities/io.js';
import { part1 } from '../12/part-1.js';
import { part2 } from '../12/part-2.js';

const data = read(2015, 12);

describe('2015 Day 12', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(119433);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(68466);
  });
});

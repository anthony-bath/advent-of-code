import { read } from '../../utilities/io.js';
import { part1 } from '../02/part-1.js';
import { part2 } from '../02/part-2.js';

const data = read(2015, 2);

describe('2015 Day 2', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(1586300);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(3737498);
  });
});

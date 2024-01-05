import { read } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const data = read(2015, 6);

describe('2015 Day 6', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(569999);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(17836115);
  });
});

import { read } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const data = read(2015, 9);

describe('2015 Day 9', () => {
  it('Part 1', () => {
    expect(part1(data)).toBe(117);
  });

  it('Part 2', () => {
    expect(part2(data)).toBe(909);
  });
});

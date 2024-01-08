import { loadInput } from '../../utilities/io.js';
import { part1 } from '../14/part-1.js';
import { part2 } from '../14/part-2.js';

const { data } = loadInput(2016, 14);

describe('2016 Day 14', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(18626);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(20092);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../02/part-1.js';
import { part2 } from '../02/part-2.js';

const { data } = loadInput(2019, 2);

describe('2019 Day 2', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(4714701);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(5121);
  });
});

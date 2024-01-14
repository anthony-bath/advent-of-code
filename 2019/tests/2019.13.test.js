import { loadInput } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const { data } = loadInput(2019, 13);

describe('2019 Day 13', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(312);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(15909);
  });
});

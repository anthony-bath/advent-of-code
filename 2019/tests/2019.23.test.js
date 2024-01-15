import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { data } = loadInput(2019, 23);

describe('2019 Day 23', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(19937);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(13758);
  });
});

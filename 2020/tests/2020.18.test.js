import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { data } = loadInput(2020, 18);

describe('2020 Day 18', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(5783053349377);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(74821486966872);
  });
});

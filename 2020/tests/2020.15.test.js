import { loadInput } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const { data } = loadInput(2020, 15);

describe('2020 Day 15', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(614);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(1065);
  });
});

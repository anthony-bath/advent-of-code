import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { data } = loadInput(2018, 5);

describe('2018 Day 5', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(10450);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(4624);
  });
});

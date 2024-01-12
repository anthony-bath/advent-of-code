import { loadInput } from '../../utilities/io.js';
import { part1 } from '../08/part-1.js';
import { part2 } from '../08/part-2.js';

const { data } = loadInput(2018, 8);

describe('2018 Day 8', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(42768);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(34348);
  });
});

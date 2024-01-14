import { loadInput } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const { data } = loadInput(2019, 15);

describe('2019 Day 15', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(228);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(348);
  });
});

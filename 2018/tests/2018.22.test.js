import { loadInput } from '../../utilities/io.js';
import { part1 } from '../22/part-1.js';
import { part2 } from '../22/part-2.js';

const { lines } = loadInput(2018, 22);

describe('2018 Day 22', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(6256);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(973);
  });
});

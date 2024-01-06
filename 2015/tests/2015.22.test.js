import { loadInput } from '../../utilities/io.js';
import { part1 } from '../22/part-1.js';
import { part2 } from '../22/part-2.js';

const { lines } = loadInput(2015, 22);

describe('2015 Day 22', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(900);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(1216);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { lines } = loadInput(2016, 3);

describe('2016 Day 3', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(1050);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(1921);
  });
});

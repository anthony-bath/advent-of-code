import { loadInput } from '../../utilities/io.js';
import { part1 } from '../01/part-1.js';
import { part2 } from '../01/part-2.js';

const { lines } = loadInput(2018, 1);

describe('2018 Day 1', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(470);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(790);
  });
});

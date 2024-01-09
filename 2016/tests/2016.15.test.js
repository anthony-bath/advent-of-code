import { loadInput } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const { lines } = loadInput(2016, 15);

describe('2016 Day 15', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(400589);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(3045959);
  });
});

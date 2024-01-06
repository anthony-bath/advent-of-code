import { loadInput } from '../../utilities/io.js';
import { part1 } from '../17/part-1.js';
import { part2 } from '../17/part-2.js';

const { lines } = loadInput(2015, 17);

describe('2015 Day 17', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(1304);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(18);
  });
});

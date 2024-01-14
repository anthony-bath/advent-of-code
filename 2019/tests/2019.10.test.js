import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines } = loadInput(2019, 10);

describe('2019 Day 10', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(288);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(616);
  });
});

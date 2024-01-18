import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines } = loadInput(2021, 10);

describe('2021 Day 10', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(315693);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(1870887234);
  });
});

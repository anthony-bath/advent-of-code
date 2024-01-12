import { loadInput } from '../../utilities/io.js';
import { part1 } from '../19/part-1.js';
import { part2 } from '../19/part-2.js';

const { lines } = loadInput(2018, 19);

describe('2018 Day 19', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(1350);
  });

  it('Part 2', () => {
    expect(part2()).toBe(15844608);
  });
});

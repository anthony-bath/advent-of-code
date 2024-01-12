import { loadInput } from '../../utilities/io.js';
import { part1 } from '../12/part-1.js';
import { part2 } from '../12/part-2.js';

const { lines } = loadInput(2018, 12);

describe('2018 Day 12', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(1447);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(1050000000480);
  });
});

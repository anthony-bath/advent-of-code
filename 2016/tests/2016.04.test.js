import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { lines } = loadInput(2016, 4);

describe('2016 Day 4', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(173787);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(548);
  });
});

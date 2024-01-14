import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { lines } = loadInput(2019, 6);

describe('2019 Day 6', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(621125);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(550);
  });
});

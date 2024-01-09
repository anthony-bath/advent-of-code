import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { data } = loadInput(2016, 16);

describe('2016 Day 16', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe('11111000111110000');
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe('10111100110110100');
  });
});

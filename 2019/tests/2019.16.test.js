import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { data } = loadInput(2019, 16);

describe('2019 Day 16', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe('23135243');
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe('21130597');
  });
});

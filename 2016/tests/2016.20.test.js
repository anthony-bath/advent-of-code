import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { lines } = loadInput(2016, 20);

describe('2016 Day 20', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(19449262);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(119);
  });
});

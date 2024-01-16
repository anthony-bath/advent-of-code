import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { lines } = loadInput(2020, 16);

describe('2020 Day 16', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(23054);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(51240700105297);
  });
});

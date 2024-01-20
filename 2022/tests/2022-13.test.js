import { loadInput } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const { lines } = loadInput(2022, 13);

describe('2022 Day 13', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(6046);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(21423);
  });
});

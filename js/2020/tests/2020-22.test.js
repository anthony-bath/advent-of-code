import { loadInput } from '../../utilities/io.js';
import { part1 } from '../22/part-1.js';
import { part2 } from '../22/part-2.js';

const { lines } = loadInput(2020, 22);

describe('2020 Day 22', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(32448);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(32949);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines, data } = loadInput(2022, 10);

describe('2022 Day 10', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(17020);
  });

  // Part 2 outputs a grid of pixels, so we'll just check that it's not empty.
  test('Part 2', () => {
    expect(part2({ lines }).length).toBeGreaterThan(0);
  });
});

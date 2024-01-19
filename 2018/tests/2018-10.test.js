import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines } = loadInput(2018, 10);

describe('2018 Day 10', () => {
  // Part 1 outputs a grid of pixels, so we'll just check that it's not empty.
  test('Part 1', () => {
    expect(part1({ lines }).length).toBeGreaterThan(0);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(10641);
  });
});

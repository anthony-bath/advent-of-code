import { loadInput } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const { lines } = loadInput(2021, 13);

describe('2021 Day 13', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(850);
  });

  // Part 2 outputs a grid of pixels, so we'll just check that it's not empty.
  test('Part 2', () => {
    expect(part2({ lines }).length).toBeGreaterThan(0);
  });
});

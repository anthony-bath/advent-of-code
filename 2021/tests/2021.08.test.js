import { loadInput } from '../../utilities/io.js';
import { part1 } from '../08/part-1.js';
import { part2 } from '../08/part-2.js';

const { lines } = loadInput(2021, 8);

describe('2021 Day 8', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(303);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(961734);
  });
});

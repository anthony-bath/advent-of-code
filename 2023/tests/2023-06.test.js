import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { lines } = loadInput(2023, 6);

describe('2023 Day 6', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(275724);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(37286485);
  });
});

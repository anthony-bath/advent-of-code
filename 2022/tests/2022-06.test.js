import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { data } = loadInput(2022, 6);

describe('2022 Day 6', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(1876);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(2202);
  });
});

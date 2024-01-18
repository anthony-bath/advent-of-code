import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { lines } = loadInput(2020, 6);

describe('2020 Day 6', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(6521);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(3305);
  });
});

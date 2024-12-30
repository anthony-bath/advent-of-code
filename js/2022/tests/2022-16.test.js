import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { lines } = loadInput(2022, 16);

describe('2022 Day 16', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(1845);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(2286);
  });
});

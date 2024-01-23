import { loadInput } from '../../utilities/io.js';
import { part1 } from '../07/part-1.js';
import { part2 } from '../07/part-2.js';

const { lines } = loadInput(2023, 7);

describe('2023 Day 7', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(250120186);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(250665248);
  });
});

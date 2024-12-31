import { loadInput } from '../../utilities/io.js';
import { part1 } from '../02/part-1.js';
import { part2 } from '../02/part-2.js';

const { lines } = loadInput(2023, 2);

describe('2023 Day 2', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(2369);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(66363);
  });
});

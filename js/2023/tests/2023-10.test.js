import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines } = loadInput(2023, 10);

describe('2023 Day 10', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(6682);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(353);
  });
});

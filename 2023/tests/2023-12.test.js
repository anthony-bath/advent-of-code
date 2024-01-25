import { loadInput } from '../../utilities/io.js';
import { part1 } from '../12/part-1.js';
import { part2 } from '../12/part-2.js';

const { lines } = loadInput(2023, 12);

describe('2023 Day 12', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(7204);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1672318386674);
  });
});

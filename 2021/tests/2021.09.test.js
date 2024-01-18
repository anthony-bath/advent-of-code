import { loadInput } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const { lines } = loadInput(2021, 9);

describe('2021 Day 9', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(465);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1269555);
  });
});

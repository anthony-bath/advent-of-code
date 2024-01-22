import { loadInput } from '../../utilities/io.js';
import { part1 } from '../21/part-1.js';
import { part2 } from '../21/part-2.js';

const { lines } = loadInput(2022, 21);

describe('2022 Day 21', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(87457751482938);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(3221245824363);
  });
});

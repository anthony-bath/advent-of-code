import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { lines } = loadInput(2021, 5);

describe('2021 Day 5', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(5092);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(20484);
  });
});

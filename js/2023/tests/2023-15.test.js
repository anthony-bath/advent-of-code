import { loadInput } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const { data } = loadInput(2023, 15);

describe('2023 Day 15', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(513643);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(265345);
  });
});

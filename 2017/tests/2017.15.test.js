import { loadInput } from '../../utilities/io.js';
import { part1 } from '../15/part-1.js';
import { part2 } from '../15/part-2.js';

const { lines } = loadInput(2017, 15);

describe('2017 Day 15', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(631);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(279);
  });
});

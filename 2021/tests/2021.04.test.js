import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { lines } = loadInput(2021, 4);

describe('2021 Day 4', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(65325);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(4624);
  });
});

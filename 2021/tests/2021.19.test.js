import { loadInput } from '../../utilities/io.js';
import { part1 } from '../19/part-1.js';
import { part2 } from '../19/part-2.js';

const { lines } = loadInput(2021, 19);

describe('2021 Day 19', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(459);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(19130);
  });
});

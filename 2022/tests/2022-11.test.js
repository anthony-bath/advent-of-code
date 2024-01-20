import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { lines, data } = loadInput(2022, 11);
let grid;

describe('2022 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(117624);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(16792940265);
  });
});

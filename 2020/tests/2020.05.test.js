import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { data } = loadInput(2020, 5);

describe('2020 Day 5', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(866);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(583);
  });
});

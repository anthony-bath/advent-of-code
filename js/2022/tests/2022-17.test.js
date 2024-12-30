import { loadInput } from '../../utilities/io.js';
import { part1 } from '../17/part-1.js';
import { part2 } from '../17/part-2.js';

const { data } = loadInput(2022, 17);

describe('2022 Day 17', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(3193);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(1577650429835);
  });
});

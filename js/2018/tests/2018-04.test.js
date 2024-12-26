import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { lines } = loadInput(2018, 4);

describe('2018 Day 4', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(14346);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(5705);
  });
});

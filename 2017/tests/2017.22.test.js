import { loadInput } from '../../utilities/io.js';
import { part1 } from '../22/part-1.js';
import { part2 } from '../22/part-2.js';

const { lines } = loadInput(2017, 22);

describe('2017 Day 22', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(5339);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(2512380);
  });
});

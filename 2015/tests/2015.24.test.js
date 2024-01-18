import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

const { lines } = loadInput(2015, 24);

describe('2015 Day 24', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(10723906903);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(74850409);
  });
});

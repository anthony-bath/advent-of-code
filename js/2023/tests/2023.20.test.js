import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { lines } = loadInput(2023, 20);

describe('2023 Day 20', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(807069600);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(221453937522197);
  });
});

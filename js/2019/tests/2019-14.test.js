import { loadInput } from '../../utilities/io.js';
import { part1 } from '../14/part-1.js';
import { part2 } from '../14/part-2.js';

const { lines } = loadInput(2019, 14);

describe('2019 Day 14', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(319014);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(4076490);
  });
});

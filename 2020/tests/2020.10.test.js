import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { lines } = loadInput(2020, 10);

describe('2020 Day 10', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(2475);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(442136281481216);
  });
});

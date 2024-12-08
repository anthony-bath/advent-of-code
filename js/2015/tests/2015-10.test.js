import { loadInput } from '../../utilities/io.js';
import { part1 } from '../10/part-1.js';
import { part2 } from '../10/part-2.js';

const { data } = loadInput(2015, 10);

describe('2015 Day 10', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(252594);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(3579328);
  });
});

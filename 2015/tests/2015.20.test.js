import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { data } = loadInput(2015, 20);

describe('2015 Day 20', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(831600);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(884520);
  });
});

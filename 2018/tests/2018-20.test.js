import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { data } = loadInput(2018, 20);

describe('2018 Day 20', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(3810);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(8615);
  });
});

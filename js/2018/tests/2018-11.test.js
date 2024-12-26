import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { data } = loadInput(2018, 11);

describe('2018 Day 11', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe('20,62');
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe('229,61,16');
  });
});

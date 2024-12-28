import { loadInput } from '../../utilities/io.js';
import { part1 } from '../23/part-1.js';
import { part2 } from '../23/part-2.js';

const { data } = loadInput(2020, 23);

describe('2020 Day 23', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe('76952348');
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(72772522064);
  });
});

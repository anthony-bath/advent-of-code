import { loadInput } from '../../utilities/io.js';
import { part1 } from '../21/part-1.js';
import { part2 } from '../21/part-2.js';

const { data } = loadInput(2019, 21);

describe('2019 Day 21', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(19354173);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(1145849660);
  });
});

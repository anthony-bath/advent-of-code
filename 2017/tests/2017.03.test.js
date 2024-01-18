import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { data } = loadInput(2017, 3);

describe('2017 Day 3', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(552);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(330785);
  });
});

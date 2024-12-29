import { loadInput } from '../../utilities/io.js';
import { part1 } from '../16/part-1.js';
import { part2 } from '../16/part-2.js';

const { data } = loadInput(2021, 16);

describe('2021 Day 16', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(967);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(12883091136209);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { data } = loadInput(2019, 4);

describe('2019 Day 4', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(530);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(324);
  });
});

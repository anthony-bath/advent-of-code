import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { data } = loadInput(2019, 5);

describe('2019 Day 5', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(7692125);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(14340395);
  });
});

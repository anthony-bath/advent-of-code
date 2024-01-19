import { loadInput } from '../../utilities/io.js';
import { part1 } from '../17/part-1.js';
import { part2 } from '../17/part-2.js';

const { data } = loadInput(2017, 17);

describe('2017 Day 17', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(866);
  });

  test('Part 2', () => {
    expect(part2({ data })).toBe(11995607);
  });
});

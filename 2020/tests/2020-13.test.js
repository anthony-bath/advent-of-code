import { loadInput } from '../../utilities/io.js';
import { part1 } from '../13/part-1.js';
import { part2 } from '../13/part-2.js';

const { lines } = loadInput(2020, 13);

describe('2020 Day 13', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(153);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(471793476184394);
  });
});

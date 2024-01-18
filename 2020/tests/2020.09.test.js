import { loadInput } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const { lines } = loadInput(2020, 9);

describe('2020 Day 9', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(556543474);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(76096372);
  });
});

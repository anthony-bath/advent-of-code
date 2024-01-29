import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { lines } = loadInput(2023, 18);

describe('2023 Day 18', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(46359);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(59574883048274);
  });
});

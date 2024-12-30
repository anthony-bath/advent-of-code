import { loadInput } from '../../utilities/io.js';
import { part1 } from '../20/part-1.js';
import { part2 } from '../20/part-2.js';

const { lines } = loadInput(2022, 20);

describe('2022 Day 20', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(6640);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(11893839037215);
  });
});

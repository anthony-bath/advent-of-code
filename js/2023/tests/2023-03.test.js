import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { lines } = loadInput(2023, 3);

describe('2023 Day 3', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(532445);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(79842967);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../17/part-1.js';
import { part2 } from '../17/part-2.js';

const { lines } = loadInput(2023, 17);

describe('2023 Day 17', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(1013);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(1215);
  });
});

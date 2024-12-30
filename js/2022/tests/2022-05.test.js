import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { lines } = loadInput(2022, 5);

describe('2022 Day 5', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe('GFTNRBZPF');
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe('VRQWPDSGP');
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../24/part-1.js';
import { part2 } from '../24/part-2.js';

describe('2021 Day 24', () => {
  test('Part 1', () => {
    expect(part1()).toBe('99911993949684');
  });

  test('Part 2', () => {
    expect(part2()).toBe('62911941716111');
  });
});

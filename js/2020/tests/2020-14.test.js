import { loadInput } from '../../utilities/io.js';
import { part1 } from '../14/part-1.js';
import { part2 } from '../14/part-2.js';

const { lines } = loadInput(2020, 14);

describe('2020 Day 14', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(13105044880745);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(3505392154485);
  });
});

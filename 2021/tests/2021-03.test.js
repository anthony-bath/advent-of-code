import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { lines } = loadInput(2021, 3);

describe('2021 Day 3', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(741950);
  });

  test('Part 2', () => {
    expect(part2({ lines })).toBe(903810);
  });
});

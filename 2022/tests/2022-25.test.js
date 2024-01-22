import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { lines } = loadInput(2022, 25);

describe('2022 Day 25', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe('2-00=12=21-0=01--000');
  });
});

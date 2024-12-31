import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { lines } = loadInput(2023, 25);

describe('2023 Day 25', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(619225);
  });
});

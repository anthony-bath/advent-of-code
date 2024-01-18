import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { lines } = loadInput(2018, 25);

describe('2018 Day 25', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(399);
  });
});

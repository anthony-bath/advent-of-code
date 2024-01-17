import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { lines } = loadInput(2020, 25);

describe('2020 Day 25', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(1890859);
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { data } = loadInput(2019, 25);

describe('2019 Day 25', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe('352325632');
  });
});

import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { data } = loadInput(2015, 25);

describe('2015 Day 25', () => {
  test('Part 1', () => {
    expect(part1({ data })).toBe(2650453);
  });
});

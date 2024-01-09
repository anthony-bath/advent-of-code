import { loadInput } from '../../utilities/io.js';
import { part1 } from '../09/part-1.js';
import { part2 } from '../09/part-2.js';

const { data } = loadInput(2016, 9);

describe('2016 Day 9', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(70186);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(10915059201);
  });
});
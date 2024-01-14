import { loadInput } from '../../utilities/io.js';
import { part1 } from '../12/part-1.js';
import { part2 } from '../12/part-2.js';

const { lines } = loadInput(2019, 12);

describe('2019 Day 12', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(6490);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe(277068010964808);
  });
});

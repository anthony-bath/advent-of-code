import { loadInput } from '../../utilities/io.js';
import { part1 } from '../17/part-1.js';
import { part2 } from '../17/part-2.js';

const { data } = loadInput(2016, 17);

describe('2016 Day 17', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe('RLDRUDRDDR');
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(498);
  });
});

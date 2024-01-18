import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { data } = loadInput(2021, 6);

describe('2021 Day 6', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(372300);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(1675781200288);
  });
});

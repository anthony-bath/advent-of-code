import { loadInput } from '../../utilities/io.js';
import { part1 } from '../06/part-1.js';
import { part2 } from '../06/part-2.js';

const { data } = loadInput(2017, 6);

describe('2017 Day 6', () => {
  it('Part 1', () => {
    expect(part1({ data })).toBe(12841);
  });

  it('Part 2', () => {
    expect(part2({ data })).toBe(8038);
  });
});

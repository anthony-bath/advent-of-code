import { loadInput } from '../../utilities/io.js';
import { part1 } from '../11/part-1.js';
import { part2 } from '../11/part-2.js';

const { lines } = loadInput(2020, 11);
let grid;

describe('2020 Day 11', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ grid })).toBe(2324);
  });

  it('Part 2', () => {
    expect(part2({ grid })).toBe(2068);
  });
});

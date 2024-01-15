import { loadInput } from '../../utilities/io.js';
import { part1 } from '../03/part-1.js';
import { part2 } from '../03/part-2.js';

const { lines } = loadInput(2020, 3);
let grid;

describe('2020 Day 3', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ grid })).toBe(169);
  });

  it('Part 2', () => {
    expect(part2({ grid })).toBe(7560370818);
  });
});

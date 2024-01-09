import { loadInput } from '../../utilities/io.js';
import { part1 } from '../18/part-1.js';
import { part2 } from '../18/part-2.js';

const { lines } = loadInput(2015, 18);
let grid;

describe('2015 Day 18', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ grid })).toBe(768);
  });

  it('Part 2', () => {
    expect(part2({ grid })).toBe(781);
  });
});
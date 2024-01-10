import { loadInput } from '../../utilities/io.js';
import { part1 } from '../25/part-1.js';

const { lines, data } = loadInput(2016, 25);
let grid;

describe('2016 Day 25', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  it('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(189);
  });
});

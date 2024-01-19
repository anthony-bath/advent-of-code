import { loadInput } from '../../utilities/io.js';
import { part1 } from '../21/part-1.js';
import { part2 } from '../21/part-2.js';

const { lines, data } = loadInput(2021, 21);
let grid;

describe('2021 Day 21', () => {
  beforeEach(() => (grid = lines.map((line) => line.split(''))));

  test('Part 1', () => {
    expect(part1({ lines, grid, data })).toBe(707784);
  });

  test('Part 2', () => {
    expect(part2({ lines, grid, data })).toBe(157595953724471);
  });
});

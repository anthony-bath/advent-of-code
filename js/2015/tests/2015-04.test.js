import { loadInput } from '../../utilities/io.js';
import { part1 } from '../04/part-1.js';
import { part2 } from '../04/part-2.js';

const { data } = loadInput(2015, 4);

describe('2015 Day 4', () => {
  test('Part 1', async () => {
    expect(await part1({ data })).toBe(346386);
  });

  test('Part 2', async () => {
    expect(await part2({ data })).toBe(9958218);
  }, 10000);
});

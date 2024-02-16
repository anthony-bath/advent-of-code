import { loadInput } from '../../utilities/io.js';
import { part1 } from '../05/part-1.js';
import { part2 } from '../05/part-2.js';

const { data } = loadInput(2016, 5);

describe('2016 Day 5', () => {
  test('Part 1', async () => {
    expect(await part1({ data })).toBe('4543c154');
  }, 10000);

  test('Part 2', async () => {
    expect(await part2({ data })).toBe('1050cbbd');
  }, 20000);
});

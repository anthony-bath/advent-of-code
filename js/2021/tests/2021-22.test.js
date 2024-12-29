import { loadInput } from '../../utilities/io.js';
import { part1 } from '../22/part-1.js';
import { part2 } from '../22/part-2.js';

const { lines } = loadInput(2021, 22);

describe('2021 Day 22', () => {
  test('Part 1', () => {
    expect(part1({ lines })).toBe(547648);
  });

  // TODO: Need to optimize part 2 to run with less than 8GB of memory
  // test('Part 2', () => {
  //   expect(part2({ lines })).toBe(1206644425246111);
  // });
});

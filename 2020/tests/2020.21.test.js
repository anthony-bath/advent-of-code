import { loadInput } from '../../utilities/io.js';
import { part1 } from '../21/part-1.js';
import { part2 } from '../21/part-2.js';

const { lines } = loadInput(2020, 21);

describe('2020 Day 21', () => {
  it('Part 1', () => {
    expect(part1({ lines })).toBe(2150);
  });

  it('Part 2', () => {
    expect(part2({ lines })).toBe('vpzxk,bkgmcsx,qfzv,tjtgbf,rjdqt,hbnf,jspkl,hdcj');
  });
});

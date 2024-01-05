import { sum } from '../../utilities/array.js';
import { readOld, write } from '../../utilities/io.js';
import { shortestSum } from './common.js';

const [YEAR, DAY, PART] = [2015, 24, 2];

const weights = readOld(YEAR, DAY, PART)
  .map((n) => Number(n))
  .sort((a, b) => b - a);

const targetWeight = sum(weights) / 4;

// With weights sorted in descending order, the solution will always
// use the first shortest sum to the target weight

write(
  YEAR,
  DAY,
  PART,
  shortestSum(targetWeight, weights).reduce((product, w) => product * w, 1)
);

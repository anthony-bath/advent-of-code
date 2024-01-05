import { readOld, write } from '../../utilities/io.js';
import { fill } from './common.js';

const [YEAR, DAY, PART] = [2015, 17, 2];

const input = readOld(YEAR, DAY, PART)
  .map((n) => Number(n))
  .sort((a, b) => b - a);

const combinations = fill(150, input).sort((a, b) => a.length - b.length);

write(
  YEAR,
  DAY,
  PART,
  combinations.filter((combination) => combination.length === combinations[0].length).length
);

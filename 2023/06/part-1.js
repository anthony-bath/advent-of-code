import { readOld, write } from '../../utilities/io.js';
import { solveQuadratic } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2023, 6, 1];

const lines = readOld(YEAR, DAY, PART);
const times = lines[0].match(/\d+/g).map((n) => Number(n));
const distances = lines[1].match(/\d+/g).map((n) => Number(n));

const result = times.reduce((result, time, i) => {
  const [t1, t2] = solveQuadratic(1, -time, distances[i]);
  const chances = Math.floor(t1) - Math.ceil(t2) + 1;

  return (result *= chances);
}, 1);

write(YEAR, DAY, PART, result);
